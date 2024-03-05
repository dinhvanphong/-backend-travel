import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { commentModel } from '~/models/commentModel'

const createNew = async (reqBody) => {
  try {
    const createdComment = await commentModel.createNew(reqBody)
    const getNewComment = await commentModel.findOneById(createdComment.insertedId)
    return getNewComment
  } catch (error) {
    throw error
  }
}

export const commentService = {
  createNew
}