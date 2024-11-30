
import AppError from '../../errors/appError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { USER_Role } from '../User/user.constant';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isPasswordMatched } from './auth.utils';

const signupFromDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(403, 'This user already exists');
  }

  payload.role = USER_Role.Trainee;

  const newUser = await User.create(payload);
  return newUser;
};

const loginIntoDB = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!passwordMatch) {
    throw new AppError(404, "Password doesn't match !");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_refresh_expire_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expire_in },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.findOne({ email: userData.email }).select("+password");
  if (!user) throw new AppError(404, "User not found");


  const passwordMatch = await isPasswordMatched(payload.oldPassword, user.password);
  console.log("Password Match Result:", passwordMatch);

  if (!passwordMatch) {
    throw new AppError(403, "Password doesn't match!");
  }

  const newHashPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));
  
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      password: newHashPassword,
      passwordChangeAt: new Date(),
    }
  );

  return user;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking user existing
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  // checking if user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(404, 'This user is deleted !');
  }

  // checking user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(404, 'This user is blocked !');
  }
  const isJWTIssuedBeforePasswordChanged = (
    passwordChangeAt: Date,
    iat: number,
  ): boolean => {
    const jwtIssuedTimestamp = iat * 1000;

    if (!passwordChangeAt) return false;

    const passwordTimestamp = new Date(passwordChangeAt).getTime();
    return jwtIssuedTimestamp < passwordTimestamp;
  };

  // Check if the password was changed after the JWT was issued
  if (
    user.passwordChangeAt &&
    isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(401, 'You are not authorized!');
  }

  //   create token and sent client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expire_in as string,
  });
  return { accessToken };
};



export const AuthServices = {
  signupFromDB,
  loginIntoDB,
  changePassword,
  refreshToken,
};
