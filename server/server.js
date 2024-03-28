const express = require('express');
const userRouter = require('./resources/users/userRouter');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/api/users', userRouter)

app.listen(PORT, () => console.log('Server listening on port', PORT));
