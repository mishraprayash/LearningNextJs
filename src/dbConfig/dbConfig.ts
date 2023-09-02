import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB", mongoose.connection.host);
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB Connection Error: ", err);
  process.exit();
});

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!,{
      serverSelectionTimeoutMS:20000
    });
  } catch (error) {
    console.log(" MongoDB Error", error);
  }
}
