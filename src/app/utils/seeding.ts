/* eslint-disable no-console */
import config from '../config';
import { USER_Role, USER_Status } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

export const seed = async () => {
  try {
    //atfirst check if the admin exist of not
    const admin = await User.findOne({
      role: USER_Role.Admin,
      email: config.admin_email,
      status: USER_Status.active,
    });
    if (!admin) {
      console.log('Seeding started...');

      await User.create({
        name: 'Admin',
        role: USER_Role.Admin,
        email: config.admin_email,
        password: config.admin_pass,
        status: USER_Status.active,
      });
      console.log('Admin created successfully...');
      console.log('Seeding completed...');
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};
