import AppError from "../../errors/appError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
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

const updateTrainerIntoDB = async (
  trainerId: string,
  updates: { name?: string; email?: string; specialization?: string }
) => {
  const { name, email, specialization } = updates;

  console.log(name, email, specialization, 'bbbb')

  // Step 1: Find the Trainer document
  const trainer = await Trainer.findById(trainerId).populate('user');

  if (!trainer) {
    throw new AppError(404, 'Trainer not found');
  }

  const userId = trainer.user._id;

  // Step 2: Prepare update objects
  const userUpdates: Partial<TUser> = {};
  if (name) userUpdates.name = name;
  if (email) userUpdates.email = email;

  const trainerUpdates: Partial<TTrainer> = {};
  if (specialization) trainerUpdates.specialization = specialization;

  // Step 3: Update both documents
  const updatedUser = await User.findByIdAndUpdate(userId, { $set: userUpdates }, { new: true, runValidators: true });
  const updatedTrainer = await Trainer.findByIdAndUpdate(trainerId, { $set: trainerUpdates }, { new: true }).populate('user');

  // Step 4: Check if updates were successful
  if (!updatedUser || !updatedTrainer) {
    throw new AppError(500, 'Failed to update trainer and/or user');
  }

  return updatedTrainer;
};
const deleteTrainerIntoDB = async (id: string) => {
  const isTrainer = await Trainer.findById(id);
  if (!isTrainer) {
    throw new AppError(404, "trainer not found");
  }
  const trainer = await Trainer.findByIdAndDelete(
    id,
   
  );
  if (!trainer) {
    throw new AppError(400, 'Failed to delete trainer');
  }
  const userId = trainer.user;
  const deleteUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new:true} );
  if (!deleteUser) {
    throw new AppError(400, 'Failed to delete user');
  }
  return trainer;
};

export const TrainerServices = {
  createTrainerIntoDB,
  getTrainerFromDB,
  getAllTrainer,
  updateTrainerIntoDB,
  deleteTrainerIntoDB,
};
