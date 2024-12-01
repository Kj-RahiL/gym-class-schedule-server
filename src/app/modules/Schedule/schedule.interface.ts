import  { Types } from "mongoose";

export type TSchedule = {
  trainer: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  maxCapacity?: number;
};
