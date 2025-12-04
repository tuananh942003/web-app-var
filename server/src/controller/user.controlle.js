import  express from '  express';
import User from '../model/user.model.js';


export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo người dùng', error });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng', error });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;  
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa người dùng', error });
  }
};