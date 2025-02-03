import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: String,
    users: [string],
});

export default mongoose.model("Room", roomSchema);