require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user'); // Ensure the correct path to your User model
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

mongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get('/', (req, res) => { 
  res.send('Hello World');
});

// Route to check if the user exists
app.post('/api/checkUser', async (req, res) => {
  const { clerkId } = req.body;
  console.log('Checking user:', clerkId);
  try {
    const user = await User.findOne({ clerkId });
    console.log(user);
    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for onboarding a user
app.post('/api/onboarding', async (req, res) => {
  const userData = req.body;
  console.log('Onboarding data received:', userData);
  const n = {displayName: userData.displayName, email: userData.email, clerkId: userData.clerkId, role: userData.role, country: userData.country, phone: userData.phone, address: userData.address, pincode: userData.pincode};
  const newUser = new User(n); // Create a new user instance

  try {
    await newUser.save();
    console.log('User onboarded:', newUser);
    return res.status(201).json({ message: 'User onboarded successfully!' });
  } catch (error) {
    console.error('Error onboarding user:', error);
    return res.status(500).json({ error: 'Error onboarding user', details: error.message });
  }
});
