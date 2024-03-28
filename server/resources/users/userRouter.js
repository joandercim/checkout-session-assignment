const express = require('express');
const { getUsers, createUser, getUser } = require('./userControllers');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/create', createUser);


module.exports = userRouter;
