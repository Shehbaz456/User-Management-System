import User from "../models/User.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !hobbies) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (typeof age !== "number" || age < 0) {
    return res.status(400).json({ message: "Age must be a positive number." });
  }

  try {
    const newUser = await User.create({ username, age, hobbies });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);  // ✅ Log actual error
    res.status(500).json({ message: "Failed to create user.", error: error.message });
    // res.status(500).json({ message: "Failed to create user." });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user data
    user.username = username || user.username;
    user.age = age || user.age;
    user.hobbies = hobbies || user.hobbies;

    await user.save();
    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user." });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }
};
