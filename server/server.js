const express = require('express');
const userRouter = require('./resources/users/userRouter');
require('dotenv').config();
const app = express();

app.use('/api/users', userRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server listening on port', PORT));
