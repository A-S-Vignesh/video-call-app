import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/videocallDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


export default mongoose;