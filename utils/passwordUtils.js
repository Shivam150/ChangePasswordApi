// utils/passwordUtils.js
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config');

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePasswords };
