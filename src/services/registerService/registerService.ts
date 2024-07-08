import User, { IUser } from "../../models/User";


export const registerUser = async (username: string, email: string, password: string): Promise<IUser> => {
  const user = new User({ username, email, password });
  await user.save();
  return user;
};

export default registerUser;
