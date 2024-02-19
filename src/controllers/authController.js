
import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

// import ApiError from '~/utils/ApiError'

const createNew =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const createdUser = await authService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}

const login =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const loginUser = await authService.login(res, req.body)
    res.status(StatusCodes.CREATED).json(loginUser)
  } catch (error) {
    next(error)
  }
}

const loginUser =async (req, res, next) => {
  try {
    // console.log('body', req.body)
    const loginUser = await authService.loginUser(res, req.body)
    res.status(StatusCodes.CREATED).json(loginUser)
  } catch (error) {
    next(error)
  }
}

const requestRefreshToken =async (req, res, next) => {
  try {
    const tokens = await authService.requestRefreshToken(req, res)
    res.status(StatusCodes.OK).json(tokens)
  } catch (error) {
    next(error)
  }
}

const logout =async (req, res, next) => {
  try {
    const logout = await authService.logout(req, res)
    res.status(StatusCodes.OK).json(logout)
  } catch (error) {
    next(error)
  }
}

export const authController = {
  createNew,
  login,
  requestRefreshToken,
  logout,
  loginUser
}