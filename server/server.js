require('dotenv').config();
const express = require('express');
const authRouter = require('./resources/auth/authRouter');
const cookieSession = require('cookie-session');
const customerRouter = require('./resources/customers/customerRouter');
const checkoutRouter = require('./resources/checkout/checkoutRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieSession({
    secret: process.env.COOKIE_SESSION_SECRET_KEY,
    maxAge: 24 * 60 * 60 * 1000
}))
app.use('/api/customers', customerRouter)
app.use('/api/auth', authRouter)
app.use('/api/checkout', checkoutRouter)

app.listen(PORT, () => console.log('Server listening on port', PORT));
