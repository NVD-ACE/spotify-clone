import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    // Token will be automatically removed after 7 days
    index: { expires: "7d" },
    //index: { expireAfterSeconds: 0 }
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
  },
  deviceInfo: {
    userAgent: String,
    ip: String,
    deviceType: String,
    browser: String,
    os: String,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
});
// Index for better query performance
// refreshTokenSchema.index({ userId: 1, expiresAt: 1 });
// refreshTokenSchema.index({ token: 1, isRevoked: 1 });

// const cleanupExpiredTokens = async () => {
//   try {
//     // Delete expired tokens from database
//     const result = await RefreshToken.deleteMany({
//       expiresAt: { $lt: new Date() },
//     });

//     console.log(`Cleaned up ${result.deletedCount} expired refresh tokens`);
//   } catch (error) {
//     console.error("Error cleaning up expired tokens:", error);
//   }
// };
// // Schedule cleanup every 24 hours
// setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000);
export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
