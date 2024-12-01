import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBooking();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved successfully!',
    data: result,
  });
});
const getBooking = catchAsync(async (req, res) => {
  const {id} =req.params
  const result = await BookingServices.getBookingFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking retrieved successfully!',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  
  const { id } = req.params;
  console.log('api hit', id, req.params)
  const result = await BookingServices.updateBookingIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking updated successfully!',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking Deleted successfully!',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getBooking,
  updateBooking,
  deleteBooking
};
