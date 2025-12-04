import express from 'express';
import User from '../model/user.model.js';
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password, role: 'admin' });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });  
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
    } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng nhập', error });
  }
};
