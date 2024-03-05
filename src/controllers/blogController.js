
import { StatusCodes } from 'http-status-codes'
import { blogService } from '~/services/blogService'

// import ApiError from '~/utils/ApiError'

const createNew =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const createdBoard = await blogService.newCreate(req.body)
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getListBlog =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const getListBlog = await blogService.getListBlog()
    res.status(StatusCodes.OK).json(getListBlog)
  } catch (error) {
    next(error)
  }
}

const getDetail =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const blogDetail = await blogService.getDetail(req.params.slug)
    res.status(StatusCodes.OK).json(blogDetail)
  } catch (error) {
    next(error)
  }
}

const update =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const blogUpdated = await blogService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(blogUpdated)
  } catch (error) {
    next(error)
  }
}

const deletedListBlog =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const deletedListBlog = await blogService.deletedListBlog()
    res.status(StatusCodes.OK).json(deletedListBlog)
  } catch (error) {
    next(error)
  }
}
export const blogController = {
  createNew,
  getListBlog,
  getDetail,
  update,
  deletedListBlog
}