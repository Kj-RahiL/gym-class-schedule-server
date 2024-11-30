import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: 'Admin' | 'Trainer' | 'Trainee';
  passwordChangeAt?: Date;
  status: 'active' | 'blocked';
  isDeleted: boolean;
};
