const express = require('express')

const noAuthTrendRouter = express.Router();
const AuthTrendRouter = express.Router();

const {getAll,createOne,deleteOne}= require('../controllers/trendCourseController')

noAuthTrendRouter.route('/').get(getAll)
AuthTrendRouter.route('/').post(createOne).delete(deleteOne)


module.exports= {noAuthTrendRouter, AuthTrendRouter};
