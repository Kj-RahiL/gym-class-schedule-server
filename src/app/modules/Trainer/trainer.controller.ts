import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrainerServices } from './trainer.service';

const createTrainer = catchAsync(async (req, res) => {
  console.log(req.body, "traaaaa")
  const result = await TrainerServices.createTrainerIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer created successfully',
    data: result,
  });
});

const getAllTrainer = catchAsync(async (req, res) => {
  const result = await TrainerServices.getAllTrainer();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainers retrieved successfully!',
    data: result,
  });
});
const getTrainer = catchAsync(async (req, res) => {
  const {id} =req.params
  const result = await TrainerServices.getTrainerFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer retrieved successfully!',
    data: result,
  });
});

const updateTrainer = catchAsync(async (req, res) => {
  
  const { id } = req.params;
  const { updatedData } = req.body;
  console.log('api hit', id, updatedData)
  const result = await TrainerServices.updateTrainerIntoDB(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer updated successfully!',
    data: result,
  });
});

const deleteTrainer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainerServices.deleteTrainerIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer Deleted successfully!',
    data: result,
  });
});

export const TrainerControllers = {
  createTrainer,
  getAllTrainer,
  getTrainer,
  updateTrainer,
  deleteTrainer
};
