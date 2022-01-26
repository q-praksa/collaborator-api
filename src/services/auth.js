const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./user');
const { v4: uuidv4 } = require('uuid');
const refreshTokenService = require('./refreshToken');
const { accessTokenSecret, refreshTokenSecret } = require('../config/index');

async function signUp({ email, password }) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userService.create({
      id: uuidv4(),
      email: email,
      password: hashedPassword,
    });
    return createdUser;
  } catch (e) {
    throw new Error('SIGN_UP_FAILED');
  }
}

function generateAccessToken(user) {
  const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret, {
    expiresIn: '30m',
  });
  return accessToken;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ userId: user.id }, refreshTokenSecret);
  return refreshToken;
}

async function logIn({ user, password }) {
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (e) {
    throw new Error('PASSWORD_CHECK_FAILED');
  }
  if (!isPasswordValid) {
    throw new Error('INVALID_PASSWORD');
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  try {
    await refreshTokenService.create({ value: refreshToken });
  } catch (e) {
    throw new Error('REFRESH_TOKEN_CREATE_FAIL');
  }

  return { accessToken, refreshToken };
}

async function logOut(refreshToken) {
  return await refreshTokenService.destroy({ value: refreshToken });
}

async function refreshToken(refreshToken) {
  let accessToken;
  let tokenVerified = true;
  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      tokenVerified = false;
    }
    accessToken = generateAccessToken({ userId: user.id });
  });
  if (!tokenVerified) {
    throw new Error('INVALID_TOKEN');
  }
  return accessToken;
}

module.exports = { signUp, logIn, logOut, refreshToken };
