import express from 'express';
import { UserValidations } from './schedule.validation';
import { scheduleControllers } from './schedule.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-schedule',
  scheduleControllers.createSchedule,
);

//get
router.get('/:id', scheduleControllers.getSchedule);

//update
router.put(
  '/:id',
  scheduleControllers.updateSchedule
);
//delete
router.delete(
  '/:id',
  scheduleControllers.deleteSchedule,
);

//getAll
router.get('/', scheduleControllers.getAllSchedule);

export const ScheduleRoutes = router;
