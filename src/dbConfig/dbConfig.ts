import { error } from "console";
import mongoose, { connection } from "mongoose";

export async function connectDB() {
  try {
    const mongodbURI = process.env.MONGODB_URL;
    if (!mongodbURI) {
      throw new Error("MONGODB_URI is not prestable in your env file.");
    }
    await mongoose.connect(mongodbURI);

    const connection = await mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });
    connection.on("error", (err) => {
      console.log(`Mongodb Connection Error, Please check the db ${err}`);
      process.exit();
    });
  } catch (error) {
    console.log(`Something Went wrong in connecting DB ${error}`);
  }
}
