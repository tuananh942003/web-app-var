import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001;
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/data.js';

// Middleware
app.use(cors());
app.use(express.json());

import User from './src/model/user.model.js';
import Post from './src/model/posts.model.js';
import Service from './src/model/service.model.js';

// Define routes here
app.post('/api/users', async (req, res) => {
  
  // Logic to create a new user
 const { username, email, password,role } = req.body;
 const newUser = new User({ username, email, password, role });
  await newUser.save();
  res.status(201).json(newUser);
});
app.get('/api/users', async (req, res) => {
  // Logic to get all users
  const users = await User.find();
  res.status(200).json(users);
});
app.delete('/api/users/:id', async (req, res) => {
  // Logic to delete a user by ID
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).send();
});
app.post('/api/login', async (req, res) => {
  // Logic for user login chỉ có admin mới login được
  const { username, password } = req.body;
  const user = await User.findOne({ username, password, role: 'admin' });
  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}); 
app.post('/api/posts', async (req, res) => {
  // Logic to create a new post
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.status(201).json(newPost);
});
app.get('/api/posts', async (req, res) => {
  // Logic to get all posts
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
});
app.post('/api/services', async (req, res) => {
  // Logic to create a new service
  const { icon, title, content, description } = req.body;
  const newService = new Service({ icon, title, content, description });
  await newService.save();
  res.status(201).json(newService);
});
app.get('/api/services', async (req, res) => {
  // Logic to get all services
  const services = await Service.find();
  res.status(200).json(services);
});

// Start the server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});