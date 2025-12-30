import mongoose, { Schema, Document } from "mongoose";

export interface MessageDocument extends Document {
  name: string;
  email: string;
  telefone: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model<MessageDocument>(
  "Messages",
  MessageSchema
);
