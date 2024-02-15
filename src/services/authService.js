
import { authModel } from '~/models/authModel'


const createNew =async (reqBody) => {
  try {
    const createdUser= await authModel.createNew(reqBody)
    const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return getNewUser
  } catch (error) { throw error }

}


const login =async (res, reqBody) => {
  try {
    const loginUser= await authModel.login(res, reqBody)
    // const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return loginUser
  } catch (error) { throw error }

}

const requestRefreshToken =async (req, res) => {
  try {
    const tokens= await authModel.requestRefreshToken(req, res)
    // const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return tokens
  } catch (error) { throw error }

}

const logout =async (req, res) => {
  try {
    const logout= await authModel.logout(req, res)
    // const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return logout
  } catch (error) { throw error }

}
export const authService = {
  createNew,
  login,
  requestRefreshToken,
  logout
}