import { InferSchemaType, model, Schema } from "mongoose";

//user model schema for mongoose
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false },
});

//types are auto inferred by mongoose member function
type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
