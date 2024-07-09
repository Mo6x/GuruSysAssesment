import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/User";


export const registerUser = async (username: string, email: string, password: string): Promise<{ user: IUser, token: string }> => {
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    throw new Error('Email already in use');
  }

  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    throw new Error('Username already in use');
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return { user, token };
};

export default registerUser;
