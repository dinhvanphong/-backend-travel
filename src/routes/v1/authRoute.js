import express from 'express'
// import { StatusCodes } from 'http-status-codes'
import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'
const Router = express.Router()

Router.route('/register')
  .post(authValidation.createNew, authController.createNew)
Router.route('/login')
  .post(authController.login)


export const authRoute = Router