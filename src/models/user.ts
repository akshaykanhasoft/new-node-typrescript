// const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';
import UserInterface from '../interface/userInterface'
import { unique } from 'mongoose-typescript';
//import User from '../models/user';

function validator(value: string) {
  // Implement your custom validation logic here
  if (value === "") {
    return "error che";
  }
}

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required'] // Custom error message
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'] // Custom error message
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [
        {
          validator: (value: string) => {
            // Regex pattern to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: 'Invalid email format'
        },
        {
          validator: async function (email: string): Promise<boolean> {
            const user = await User.findOne({ email }); // Check if email already exists in the database
            return !user; // Return true if email does not exist, false otherwise
          },
          message: 'Email already exists',
        }
      ]
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (value: string) => {
          // Custom validation function
          // Ensure the password meets the minimum length requirement
          return value.length >= 8;
        },
        message: 'Password must be at least 8 characters long.',
      }
    },
    address: {
      type: String,
      require: true,
      validate: {
        validator: validator,
        error_message: 'Address must not be empty'
      }
    },
    state: {
      type: String,
      require: true,
      validate: {
        validator: validator,
        error_message: 'State must not be empty'
      }
    },
    city: {
      type: String,
      require: true,
      validate: {
        validator: validator,
        error_message: 'City must not be empty'
      }
    },
    zipcode: {
      type: String,
      require: true,
      validate: {
        validator: validator,
        error_message: 'Zipcode must not be empty'
      }
    },
    user_lat: {
      type: Number
    },
    user_lng: {
      type: Number
    },
    profile_pics: {
      type: String,
      require: true,
    },
    isActive: {
      type: String
    }
  },
  {
    timestamps: true,    
  }
)
//module.exports = mongoose.model<UserInterface>('User', dataSchema)
//export default mongoose.model<UserInterface>('User', userSchema);
export const User = mongoose.model<UserInterface>('User', userSchema);