import mongoose from "mongoose";

//custom types declared for Session data
declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}
