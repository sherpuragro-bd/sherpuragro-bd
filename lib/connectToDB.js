import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DB_URI;
const cached = {};
async function connectToDB() {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env"
    );
  }
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // Connection:
    cached.promise = mongoose.connect(`${MONGO_URI}/public`, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
}
export { connectToDB };
