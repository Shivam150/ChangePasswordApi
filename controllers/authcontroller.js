
const User = require('../models/changePasswordModel');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');

async function changePassword(req, res) {
  const { email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(user.password);
    console.log(currentPassword);

    const passwordsMatch = await comparePasswords(currentPassword, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
}

module.exports = { changePassword };
