import express from 'express';
import { UserValidations } from './user.validation';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-trainer',
  validateRequest(UserValidations.userValidationSchema),
  userControllers.createAdmin,
);

//get
router.get('/:id', userControllers.getUser);

//update
router.put(
  '/:id',
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUser,
);
//delete
router.delete(
  '/:id',
  userControllers.deleteUser,
);

//getAll
router.get('/', userControllers.getAllUser);

export const UserRoutes = router;
