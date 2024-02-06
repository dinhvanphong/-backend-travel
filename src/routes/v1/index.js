
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogRoute } from '~/routes/v1/blogRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })

})

Router.use('/blogs', blogRoute)


export const APIs_V1 = Router