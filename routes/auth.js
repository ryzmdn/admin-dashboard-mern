const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const {
  register,
  login,
  deleteAccount,
  updateAccount,
  getUser,
} = require("../controllers/authCotoller");
const { sendResetCode, verifyCode, resetPassword } = require("../controllers/resetCode");

router.get("/user", auth, getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", sendResetCode);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);
router.put("/update", auth, updateAccount);
router.delete("/delete", auth, deleteAccount);

module.exports = router;
