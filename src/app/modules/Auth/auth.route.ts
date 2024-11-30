import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { Auth } from '../../middlewares/auth';
import { USER_Role } from '../User/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/register',
  validateRequest(AuthValidation.userValidationSchema),
  AuthControllers.signup,
);

router.post(
  '/change-password',
  Auth(USER_Role.Admin, USER_Role.Trainer, USER_Role.Trainee),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);



export const AuthRoutes = router;
