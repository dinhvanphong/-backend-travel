
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogRoute } from '~/routes/v1/blogRoute'
import { authRoute } from '~/routes/v1/authRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })

})

Router.use('/blogs', blogRoute)
Router.use('/auth', authRoute)


export const APIs_V1 = Router