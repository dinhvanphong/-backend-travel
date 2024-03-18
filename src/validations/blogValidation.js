import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).trim().strict(),
    time: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).trim().strict(),
    note:Joi.string().required().min(3).trim().strict(),
    zones: Joi.string().valid('mien-bac', 'mien-trung', 'mien-nam').required(),
    imgList: Joi.array().items(
      Joi.string()
    )
    // type: Joi.string().valid('public', 'private').required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }

}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).trim().strict(),
    time: Joi.string().min(3).trim().strict(),
    description: Joi.string().min(3).trim().strict(),
    note:Joi.string().min(3).trim().strict(),
    // imgList: Joi.array().items(
    //   Joi.string()
    // )
    // type: Joi.string().valid('public', 'private').required()
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown:true
    })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }

}

const deleteBlog = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })

  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    const errorMesage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMesage)
    next(customError)
  }

}

export const blogValidation = {
  createNew,
  update,
  deleteBlog
}