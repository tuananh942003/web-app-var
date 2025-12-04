import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001;
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/data.js';
import routes from './src/routes/index.js';
// Middleware
app.use(cors());
app.use(express.json());

import User from './src/model/user.model.js';
import Post from './src/model/posts.model.js';
import Service from './src/model/service.model.js';


app.use('/api', routes);


// Start the server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});