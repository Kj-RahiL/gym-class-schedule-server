import  { model, Schema } from "mongoose";
import { TSchedule } from "./schedule.interface";

const ScheduleSchema = new Schema<TSchedule>({
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  maxCapacity: { type: Number, default: 10 },
});

export const Schedule = model<TSchedule>("Schedule", ScheduleSchema);
