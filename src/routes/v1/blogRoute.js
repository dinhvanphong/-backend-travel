
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogValidation } from '~/validations/blogValidation'
import { blogController } from '~/controllers/blogController'
// import { verifyTokenController } from '~/controllers/verifyToken'
const Router = express.Router()

Router.route('/')
  .get(blogController.getListBlog)
  .post(blogValidation.createNew, blogController.createNew)
Router.route('/pagination')
  .get(blogController.getListBlogPagination)
Router.route('/find')
  .get(blogController.getFindBlog)
Router.route('/deleted')
  .get(blogController.deletedListBlog)
Router.route('/mien-bac')
  .get(blogController.getMienBacBlogs)
Router.route('/mien-trung')
  .get(blogController.getMienTrungBlogs)
Router.route('/mien-nam')
  .get(blogController.getMienNamBlogs)
Router.route('/:slug')
  .get(blogController.getDetail)
  .put(blogValidation.update, blogController.update)
  .delete(blogController.deleteBlog)
Router.route('/hidden/:id')
  .put(blogController.hiddenBlog)
Router.route('/restore/:id')
  .put(blogController.restoreBlog)

export const blogRoute = Router