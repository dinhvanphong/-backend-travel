import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { authModel } from '~/models/authModel'

let refreshTokens = []

const createNew =async (reqBody) => {
  try {
    const createdUser= await authModel.createNew(reqBody)
    const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return getNewUser
  } catch (error) { throw error }

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


const login =async (res, reqBody) => {
  try {
    const user= await authModel.login(res, reqBody)
    const validPassword = reqBody.password === user.password && user.admin
    if (!validPassword) return res.status(StatusCodes.NOT_FOUND).json('Tên người dùng hoặc mật khẩu không chính xác!')

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
      return res.status(StatusCodes.OK).json({ ...others, accessToken })
    }
    return loginUser
  } catch (error) { throw error }

}

const loginUser =async (res, reqBody) => {
  try {
    const user= await authModel.loginUser(res, reqBody)
    const validPassword = reqBody.password === user.password
    if (!validPassword) return res.status(StatusCodes.NOT_FOUND).json('Tên người dùng hoặc mật khẩu không chính xác!')

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
      return res.status(StatusCodes.OK).json({ ...others, accessToken })
    }
  } catch (error) { throw error }

}

const requestRefreshToken =async (req, res) => {
  try {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json('You"re not authenticated')
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(StatusCodes.FORBIDDEN).json('Refresh token is not valid')
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
      return res.status(StatusCodes.OK).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      })
    })
  } catch (error) { throw error }

}

const logout =async (req, res) => {
  try {
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
    res.status(StatusCodes.OK).json('Logged out successfully!')
  } catch (error) { throw error }

}
export const authService = {
  createNew,
  login,
  requestRefreshToken,
  logout,
  loginUser
}