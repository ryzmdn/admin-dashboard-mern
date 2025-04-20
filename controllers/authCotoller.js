const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ msg: "Email has been registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.json({ msg: "Account created successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Email not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: "Account successfully deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete account", error: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  const { name, email, password } = req.body;
  const updateData = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");

    res.json({ message: "Account updated successfully", user: updateUser });
  } catch (err) {
    res.json({ message: "Failed to update account", error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
