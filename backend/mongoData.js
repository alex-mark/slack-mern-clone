import mongoose from "mongoose";

const slackSchema = mongoose.Schema({
  channelName: String,
  conversation: [
    {
      type: new mongoose.Schema(
        {
          message: String,
          user: String,
          userImage: String,
        },
        {
          timestamps: { createdAt: "timestamp" },
        }
      ),
    },
  ],
});

export default mongoose.model("conversations", slackSchema);
