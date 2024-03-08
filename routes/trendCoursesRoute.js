const express = require('express')

const noAuthTrendRouter = express.Router();
const AuthTrendRouter = express.Router();

const {getAll,createOne}= require('../controllers/trendCourseController')

noAuthTrendRouter.route('/').get(getAll)
AuthTrendRouter.route('/').post(createOne)


module.exports= {noAuthTrendRouter, AuthTrendRouter};
