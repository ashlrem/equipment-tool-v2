import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

/*
 * This Method is used to create User and inserts it to database.
 * Validates whether the password and confirm passwords are not the same,
 * Validates if username exists in database, throws error if exists.
*/
export async function createUser(args) {
    try {
      const {
        username,
        password,
        confirm,
        name,
        contactno,
        site,
        email,
        userlevel,
        accountstatus,
        updatedBy,
        dateUpdated
      } = args.userInput; //retrieve values from arguments
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('User already exists!');
      }
      if (password !== confirm) {
        throw new Error('Passwords are not the same!');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        name,
        contactno,
        site,
        email,
        userlevel,
        accountstatus,
        updatedBy,
        dateUpdated
      }, (err) => { if (err) throw err });
      user.save();
      // if user is registered without errors
      // create a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      
      return { token, password: null, ...user._doc }
    }
    catch(err) {
      throw err;
    }
}

/*
 * This Method is used when user logs in..
 * Validates whether the password from database and user input is correct,
 * Validates if username exists in database, throws error if deos not exist.
*/
export async function login(args) {
  try {
    const user = await User.findOne({ username: args.username });
    if (!user) throw new Error('Username does not exist');
    const passwordIsValid = await bcrypt.compareSync(args.password, user.password);
    if (!passwordIsValid) throw new Error('Incorrect Username or Password');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    return { token, password: null, ...user._doc }
  }
  catch (err) {
    throw err;
  }
}

/*
 * This Method is used to verify the token when user successfully loggedin
*/
export async function verifyToken(args) {
  try {
    const decoded = jwt.verify(args.token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.id })
    return { ...user._doc, password: null };
  }
  catch (err) {
    throw err;
  }
}