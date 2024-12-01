import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ScheduleServices } from './schedule.service';

const createSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule created successfully',
    data: result,
  });
});

const getAllSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAllSchedule();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule retrieved successfully!',
    data: result,
  });
});
const getSchedule = catchAsync(async (req, res) => {
  const {id} =req.params
  const result = await ScheduleServices.getScheduleFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule retrieved successfully!',
    data: result,
  });
});

const updateSchedule = catchAsync(async (req, res) => {
  
  const { id } = req.params;
  const result = await ScheduleServices.updateScheduleIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule updated successfully!',
    data: result,
  });
});

const deleteSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.deleteScheduleIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule Deleted successfully!',
    data: result,
  });
});

export const scheduleControllers = {
  createSchedule,
  getAllSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule
};
