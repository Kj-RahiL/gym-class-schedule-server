import { Types } from "mongoose";

export type TBooking = {
  trainee: Types.ObjectId;
  schedule: Types.ObjectId;
};
