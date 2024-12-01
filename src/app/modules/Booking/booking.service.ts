import AppError from "../../errors/appError";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const isBooking = await Booking.find({trainee: payload.trainee, schedule:payload.schedule})
  if(isBooking){
    throw new AppError(400, "Already Booking ");
  }

  // Create booking 
  const newBooking = await Booking.create(payload)
  return newBooking;
};

const getAllBooking = async () => {
  const result = await Booking.find();
  return result;
};
const getBookingFromDB = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError(404, "Booking Not found.");
  }
  return booking;
};

const updateBookingIntoDB = async (id: string, payload: TBooking) => {
  const isBooking = await Booking.findById(id);

  console.log(isBooking);

  if (!isBooking) {
    throw new AppError(404, "booking not found");
  }
  const booking = await Booking.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return booking;
};
const deleteBookingIntoDB = async (id: string) => {
  const isBooking = await Booking.findById(id);
  if (!isBooking) {
    throw new AppError(404, "booking not found");
  }
  const booking = await Booking.findByIdAndDelete(id);
  return booking;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingFromDB,
  getAllBooking,
  updateBookingIntoDB,
  deleteBookingIntoDB,
};
