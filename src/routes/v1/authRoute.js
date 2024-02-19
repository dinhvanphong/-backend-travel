import express from 'express'
// import { StatusCodes } from 'http-status-codes'
import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'
import { verifyTokenController } from '~/controllers/verifyToken'

const Router = express.Router()

Router.route('/register')
  .post(authValidation.createNew, authController.createNew)
Router.route('/login')
  .post(authController.login)
Router.route('/loginUser')
  .post(authController.loginUser)
Router.route('/refresh')
  .post(authController.requestRefreshToken)

// Router.route('/logout')
//   .post(verifyTokenController.verifyToken, authController.logout)
Router.route('/logout')
  .post(authController.logout)

export const authRoute = Router