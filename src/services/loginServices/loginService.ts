import jwt from "jsonwebtoken";
import User from "../../models/User";


export const loginUser = async (email: string, password: string): Promise<any | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: process.env.EXPIRESIN||"1h"});
  return {token,user_id:user._id};
};

export default loginUser;
