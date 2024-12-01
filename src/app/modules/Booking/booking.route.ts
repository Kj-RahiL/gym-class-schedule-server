import express from 'express';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/create-booking',
  BookingControllers.createBooking,
);

//get
router.get('/:id', BookingControllers.getBooking);

//update
router.put(
  '/:id',
  BookingControllers.updateBooking,
);
//delete
router.delete(
  '/:id',
  BookingControllers.deleteBooking,
);

//getAll
router.get('/', BookingControllers.getAllBooking);

export const BookingRoutes = router;
