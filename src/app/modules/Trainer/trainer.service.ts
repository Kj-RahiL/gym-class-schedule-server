import AppError from "../../errors/appError";
import { TTrainer } from "./trainer.interface";
import { Trainer } from "./trainer.model";

const createTrainerIntoDB = async (payload: TTrainer) => {
const isTrainer = await Trainer.findOne({user: payload.user})
if(isTrainer){
  throw new AppError(400, "Already created trainer");
}
  // Create trainer profile
  const trainer = await Trainer.create(payload)
  return trainer;
};
const getAllTrainer = async () => {
  const result = await Trainer.find().populate("user", "name email role");
  return result;
};
const getTrainerFromDB = async (id: string) => {
  const trainer = await Trainer.findById(id).populate("user", "name email");
  if (!trainer) {
    throw new AppError(404, "Trainer Not found.");
  }
  return trainer;
};

const updateTrainerIntoDB = async (id: string, payload: TTrainer) => {
  const isTrainer = await Trainer.findById(id);

  console.log(isTrainer);

  if (!isTrainer) {
    throw new AppError(404, "trainer not found");
  }
  const trainer = await Trainer.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return trainer;
};
const deleteTrainerIntoDB = async (id: string) => {
  const isTrainer = await Trainer.findById(id);
  if (!isTrainer) {
    throw new AppError(404, "trainer not found");
  }
  const trainer = await Trainer.findByIdAndDelete(
    id,
   
  );
  return trainer;
};

export const TrainerServices = {
  createTrainerIntoDB,
  getTrainerFromDB,
  getAllTrainer,
  updateTrainerIntoDB,
  deleteTrainerIntoDB,
};
