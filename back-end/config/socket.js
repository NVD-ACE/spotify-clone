import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  const userSockets = new Map(); // { userId -> socketId }
  const userActivities = new Map(); // { userId -> activity }

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "online");

      io.emit("user_connected", userId);
      io.emit("user_status_update", { userId, status: "online" });

      // Gửi trạng thái hiện tại của tất cả người dùng cho người dùng mới kết nối
      const currentStatuses = Array.from(userActivities.entries()).map(
        ([id, status]) => ({ userId: id, status })
      );
      socket.emit("current_user_statuses", currentStatuses);

      // Gửi danh sách người dùng đang online
      socket.emit("users_online", Array.from(userSockets.keys()));

      // Gửi danh sách hoạt động của người dùng
      io.emit("activities", Array.from(userActivities.entries()));
    });
    socket.on("update_activity", ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, text } = data;
        const message = new Message({ senderId, receiverId, text });
        await message.save();

        // send to receiver in realtime, if they're online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }
        socket.emit("message_sent", message);
      } catch (error) {}
    });

    // Xử lý khi người dùng ngắt kết nối
    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      // Cập nhật trạng thái người dùng thành offline
      if (disconnectedUserId) {
        userActivities.set(disconnectedUserId, "offline");
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
