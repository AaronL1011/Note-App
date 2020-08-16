const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logInValidation, signUpValidation } = require('../utils/form-validate');

module.exports = {
  createUser: async (args) => {
    try {
      console.log(args);
      const { error } = signUpValidation(args);
      console.log(error);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const emailAlreadyExists = await User.findOne({
        email: args.email
      });
      console.log(emailAlreadyExists);
      if (emailAlreadyExists) {
        throw new Error('A user with this email already exists');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);

      const user = new User({
        username: args.username,
        email: args.email,
        password: hashedPassword
      });

      const savedUser = await user.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);
      return {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        token
      };
    } catch (error) {
      return error;
    }
  },
  loginUser: async (args) => {
    try {
      // Validate log in form data
      const { error } = logInValidation(args);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error(
          'Some details were incorrect, please check email and password and try again.'
        );
      }

      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) {
        throw new Error(
          'Some details were incorrect, please check email and password and try again.'
        );
      }
      // Create and assign JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token
      };
    } catch (error) {
      return error;
    }
  },
  getTokenUser: async (args) => {
    try {
      const token = args.token;
      if (!token) {
        throw new Error('Token verification failed, authorization denied.');
      }

      const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verified) {
        throw new Error('Token verification failed, authorization denied.');
      }

      console.log(verified);
      return {
        _id: verified.id,
        token
      };
    } catch (error) {
      return error;
    }
  }
};
