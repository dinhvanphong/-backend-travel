
import { StatusCodes } from 'http-status-codes'
import { blogService } from '~/services/blogService'
// import ApiError from '~/utils/ApiError'

const createNew =async (req, res, next) => {
  try {
    const createdBoard = await blogService.newCreate(req.body)
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getListBlog =async (req, res, next) => {
  try {
    const getListBlog = await blogService.getListBlog()
    res.status(StatusCodes.OK).json(getListBlog)
  } catch (error) {
    next(error)
  }
}

const getFindBlog =async (req, res, next) => {
  try {
    let params = []
    params.q = req.query.q
    const getFindBlog = await blogService.getFindBlog(params)
    res.status(StatusCodes.OK).json(getFindBlog)
  } catch (error) {
    next(error)
  }
}

const getListBlogPagination =async (req, res, next) => {
  try {
    const getListBlog = await blogService.getListBlogPagination(req.query.page, req.query.limit)
    res.status(StatusCodes.OK).json(getListBlog)
  } catch (error) {
    next(error)
  }
}

const getDetail =async (req, res, next) => {
  try {
    const blogDetail = await blogService.getDetail(req.params.slug)
    res.status(StatusCodes.OK).json(blogDetail)
  } catch (error) {
    next(error)
  }
}

const getMienBacBlogs =async (req, res, next) => {
  try {
    const mienBacBlogs = await blogService.getMienBacBlogs()
    res.status(StatusCodes.OK).json(mienBacBlogs)
  } catch (error) {
    next(error)
  }
}

const getMienTrungBlogs =async (req, res, next) => {
  try {
    const mienTrungBlogs = await blogService.getMienTrungBlogs()
    res.status(StatusCodes.OK).json(mienTrungBlogs)
  } catch (error) {
    next(error)
  }
}

const getMienNamBlogs =async (req, res, next) => {
  try {
    const mienNamBlogs = await blogService.getMienNamBlogs()
    res.status(StatusCodes.OK).json(mienNamBlogs)
  } catch (error) {
    next(error)
  }
}

const update =async (req, res, next) => {
  try {
    const blogUpdated = await blogService.update(req.params.slug, req.body)
    res.status(StatusCodes.OK).json(blogUpdated)
  } catch (error) {
    next(error)
  }
}

const hiddenBlog =async (req, res, next) => {
  try {
    const hiddenBlog = await blogService.hiddenBlog(req.params.id, req.body)
    res.status(StatusCodes.OK).json(hiddenBlog)
  } catch (error) {
    next(error)
  }
}

const restoreBlog =async (req, res, next) => {
  try {
    const restoreBlog = await blogService.restoreBlog(req.params.id, req.body)
    res.status(StatusCodes.OK).json(restoreBlog)
  } catch (error) {
    next(error)
  }
}

const deletedListBlog =async (req, res, next) => {
  try {
    const deletedListBlog = await blogService.deletedListBlog()
    res.status(StatusCodes.OK).json(deletedListBlog)
  } catch (error) {
    next(error)
  }
}

const deleteBlog =async (req, res, next) => {
  try {
    const result = await blogService.deleteBlog(req.params.slug)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
export const blogController = {
  createNew,
  getListBlog,
  getFindBlog,
  getListBlogPagination,
  getDetail,
  update,
  hiddenBlog,
  restoreBlog,
  deletedListBlog,
  getMienBacBlogs,
  getMienNamBlogs,
  getMienTrungBlogs,
  deleteBlog
}