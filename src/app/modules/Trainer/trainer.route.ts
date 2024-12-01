import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TrainerControllers } from './trainer.controller';

const router = express.Router();

router.post(
  '/create-trainer',
  // validateRequest(TrainerValidations.trainerValidationSchema),
  TrainerControllers.createTrainer,
);

//get
router.get('/:id', TrainerControllers.getTrainer);

//update
router.put(
  '/:id',
  // validateRequest(TrainerValidations.updateTrainerValidationSchema),
  TrainerControllers.updateTrainer,
);
//delete
router.delete(
  '/:id',
  TrainerControllers.deleteTrainer,
);

//getAll
router.get('/', TrainerControllers.getAllTrainer);

export const TrainerRoutes = router;
