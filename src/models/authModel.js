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
      admin: user.admin
    },
    env.JWT_ACCESS_KEY,
    { expiresIn: '20s' }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      admin: user.admin
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

    if (!user) return res.status(404).json('Wrong username')
    const validPassword = data.password === user.password
    if (!validPassword) return res.status(404).json('Wrong password')

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
      return res.status(200).json({ ...others, accessToken })
    }
  } catch (error) {
    throw new Error(error)
  }
}

const requestRefreshToken = async (req, res) => {
  //Take refresh token from user
  const refreshToken = req.cookies.refreshToken
  //Send error if token is not valid
  if (!refreshToken) return res.status(401).json('You"re not authenticated')
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json('Refresh token is not valid')
  }
  jwt.verify(refreshToken, env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log('err', err)
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)
    refreshTokens.push(newRefreshToken)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:false,
      path: '/',
      sameSite: 'strict'
    })
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  })
}

const logout = (req, res) => {
  res.clearCookie('refreshToken')
  refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
  res.status(200).json('Logged out successfully!')
}

export const authModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  login,
  requestRefreshToken,
  logout
}