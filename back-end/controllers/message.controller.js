import Message from "../models/message.model.js";

export const getMessages = async (req, res, next) => {
  try {
    const { myId, userId } = req.params; // Lấy cả 2 ID từ URL

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
// import admin from "firebase-admin";

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// export const verifyFirebaseToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // Lấy Bearer token
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const decoded = await admin.auth().verifyIdToken(token);
//     req.userId = decoded.uid; // Firebase userId
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const getMessages = async (req, res, next) => {
//   try {
//     const myId = req.userId; // userId từ Firebase sau khi verify
//     const { userId } = req.params; // user còn lại

//     const messages = await Message.find({
//       $or: [
//         { senderId: userId, receiverId: myId },
//         { senderId: myId, receiverId: userId },
//       ],
//     }).sort({ createdAt: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     next(error);
//   }
// };