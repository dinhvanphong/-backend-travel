
import { authModel } from '~/models/authModel'


const createNew =async (reqBody) => {
  try {
    const createdUser= await authModel.createNew(reqBody)
    const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return getNewUser
  } catch (error) { throw error }

}


const login =async (reqBody) => {
  try {
    const loginUser= await authModel.login(reqBody)
    // const getNewUser = await authModel.findOneById(createdUser.insertedId)
    return loginUser
  } catch (error) { throw error }

}

export const authService = {
  createNew,
  login
}