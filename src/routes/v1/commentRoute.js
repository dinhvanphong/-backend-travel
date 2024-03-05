
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { commentValidation } from '~/validations/commentValidation'
import { commentController } from '~/controllers/commentController'
// import { verifyTokenController } from '~/controllers/verifyToken'
const Router = express.Router()

Router.route('/')
  .post(commentValidation.createNew, commentController.createNew)


export const commentRoute = Router