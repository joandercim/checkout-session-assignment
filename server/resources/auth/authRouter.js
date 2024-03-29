const express = require('express');
const { login, logout, authorize } = require('./authControllers');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/authorize', authorize);

module.exports = authRouter;
