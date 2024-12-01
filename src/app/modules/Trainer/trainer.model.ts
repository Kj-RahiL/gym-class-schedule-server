import  { model, Schema } from "mongoose";
import { TTrainer } from "./trainer.interface";

const trainerSchema = new Schema<TTrainer>(
  {
    user: { type:Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Trainer = model<TTrainer>("Trainer", trainerSchema);
