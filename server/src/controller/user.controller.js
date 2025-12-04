import User from '../model/user.model.js';


export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const newUser = new User({ name, username, email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username hoặc email đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi khi tạo người dùng', error: error.message });
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

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, password, role } = req.body;
    const updateData = { name, username, email, role };
    if (password) {
      updateData.password = password;
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error });
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
