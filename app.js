const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/user_api');

const User = mongoose.model('User', {
  fullName: String,
  email: String,
  password: String,
});

app.use(bodyParser.json());


app.post('/user/create', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    console.log('Received email:', email);

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one number' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/user/edit', async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName) {
      existingUser.fullName = fullName;
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
      }
  
      if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
      }
  
      if (!/[a-z]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
      }
  
      if (!/[0-9]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one number' });
      }

      existingUser.password = await bcrypt.hash(password, 10);
    }

    await existingUser.save();
    return res.json({ message: 'User details updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/user/delete', async (req, res) => {
  try {
    const { email } = req.body;

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/user/getAll', async (req, res) => {
  try {
    const users = await User.find({}, { fullName: 1, email: 1, password: 1 });

    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
