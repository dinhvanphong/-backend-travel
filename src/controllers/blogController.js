
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

export const blogController = {
  createNew
}