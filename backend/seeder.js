import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import into DB
const importData = async () => {
  try {
    const email = process.argv[3] || process.env.ADMIN_EMAIL;
    const password = process.argv[4] || process.env.ADMIN_PASSWORD;
    const name = process.argv[5] || process.env.ADMIN_NAME || 'Admin';

    if (!email || !password) {
      console.log('Please provide credentials via args: node seeder -i <email> <password> <name?>');
      console.log('Or use .env variables: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME');
      process.exit();
    }

    let user = await User.findOne({ email });

    if (user) {
      user.password = password;
      user.name = name;
      await user.save();
      console.log('Admin User Updated...');
    } else {
      await User.create({
        name,
        email,
        password,
      });
      console.log('Admin User Created...');
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
