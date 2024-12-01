import AppError from "../../errors/appError";
import { TSchedule } from "./schedule.interface";
import { Schedule } from "./schedule.model";

const createScheduleIntoDB = async (payload: TSchedule) => {
  // Check if the daily limit of schedules is reached
  const schedules = await Schedule.find({date: payload.date});
  if (schedules.length >= 5) {
    throw new AppError(400, "Daily schedule limit reached");
  }
   // Create new schedule 
   const newSchedule = await Schedule.create(payload); 
  return newSchedule;
};
const getAllSchedule = async () => {
  const result = await Schedule.find().populate('trainer', 'user');
  return result;
};
const getScheduleFromDB = async (id: string) => {
  const schedule = await Schedule.findById(id).populate('trainer', 'user');
  if (!schedule) {
    throw new AppError(404, "Schedule Not found.");
  }
  return Schedule;
};

const updateScheduleIntoDB = async (id: string, payload:TSchedule) => {
  const isSchedule = await Schedule.findById(id);

  console.log(isSchedule);

  if (!isSchedule) {
    throw new AppError(404, "Schedule not found");
  }
  const schedule = await Schedule.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return schedule;
};
const deleteScheduleIntoDB = async (id: string) => {
  const isSchedule = await Schedule.findById(id);
  if (!isSchedule) {
    throw new AppError(404, "user not found");
  }
  const schedule = await Schedule.findByIdAndDelete(
    id
  );
  return schedule;
};

export const ScheduleServices = {
  createScheduleIntoDB,
  getScheduleFromDB,
  getAllSchedule,
  updateScheduleIntoDB,
  deleteScheduleIntoDB,
};
