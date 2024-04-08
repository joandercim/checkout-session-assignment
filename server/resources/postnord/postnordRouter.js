const express = require('express');
const getServicePoints = require('./postnordControllers');

const postnordRouter = express.Router();

postnordRouter.get('/servicepoints/:postal_code', getServicePoints)

module.exports= postnordRouter;