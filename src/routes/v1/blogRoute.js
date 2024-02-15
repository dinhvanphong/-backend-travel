
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogValidation } from '~/validations/blogValidation'
import { blogController } from '~/controllers/blogController'
import { verifyTokenController } from '~/controllers/verifyToken'
const Router = express.Router()

Router.route('/')
  .get(verifyTokenController.verifyToken, blogController.getListBlog)
  .post(blogValidation.createNew, blogController.createNew)
Router.route('/:id')
  .get(blogController.getDetail)
  .put(blogValidation.update, blogController.update)

export const blogRoute = Router