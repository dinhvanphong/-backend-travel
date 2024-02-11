
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogValidation } from '~/validations/blogValidation'
import { blogController } from '~/controllers/blogController'
const Router = express.Router()

Router.route('/')
  .get(blogController.getListBlog)
  .post(blogValidation.createNew, blogController.createNew)
Router.route('/:id')
  .get(blogController.getDetail)
  .put(blogValidation.update, blogController.update)

export const blogRoute = Router