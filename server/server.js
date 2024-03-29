const express = require('express');
const userRouter = require('./resources/users/userRouter');
const authRouter = require('./resources/auth/authRouter');
const cookieSession = require('cookie-session');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieSession({
    secret: 'mysuperawesomebutalsosupersecretsecretkey',
    maxAge: 24 * 60 * 60 * 1000
}))
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log('Server listening on port', PORT));
