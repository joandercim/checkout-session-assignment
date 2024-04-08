require('dotenv').config();
const cors = require('cors');
const express = require('express');
const authRouter = require('./resources/auth/authRouter');
const cookieSession = require('cookie-session');
const customerRouter = require('./resources/customers/customerRouter');
const stripeRouter = require('./resources/stripe/stripeRouter');
const postnordRouter = require('./resources/postnord/postnordRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use(
  cookieSession({
    secret: process.env.COOKIE_SESSION_SECRET_KEY,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Routers
app.use('/api/customers', customerRouter);
app.use('/api/auth', authRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/postnord', postnordRouter);

app.listen(PORT, () => console.log('Server listening on port', PORT));
