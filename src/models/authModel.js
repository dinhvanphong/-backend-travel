import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
let refreshTokens = []

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(20).trim().strict(),
  email: Joi.string().required().min(3).max(50).trim().strict(),
  password: Joi.string().required().min(3).max(20).trim().strict(),
  admin: Joi.boolean().default(false),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})

// const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
    return createdUser
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin
    },
    env.JWT_ACCESS_KEY,
    { expiresIn: '30s' }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin
    },
    env.JWT_REFRESH_KEY,
    { expiresIn: '365d' }
  )
}

const login = async (res, data) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      username: data.username
    })
    const validPassword = data.password === user.password
    if (user && validPassword) {
      //Generate access token
      const accessToken = generateAccessToken(user)
      //Generate refresh token
      const refreshToken = generateRefreshToken(user)
      refreshTokens.push(refreshToken)
      // STORE REFRESH TOKEN IN COOKIE
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:false,
        path: '/',
        sameSite: 'strict'
      })
      const { password, ...others } = user
      return res.status(200).json({ ...others, accessToken, refreshToken })
    }
    return validPassword
  } catch (error) {
    throw new Error(error)
  }
}

export const authModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  login
}