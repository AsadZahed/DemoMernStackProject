import { InferSchemaType, model, Schema } from "mongoose";

//model schema for mongoose, timestamps are auto added by mongoose
const noteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

//type inferring using mongoose member function
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
