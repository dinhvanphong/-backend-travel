
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogValidation } from '~/validations/blogValidation'
import { blogController } from '~/controllers/blogController'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json( { message: 'API get list blog' } )
  })
  .post(blogValidation.createNew, blogController.createNew)

export const blogRoute = Router