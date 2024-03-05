
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blogRoute } from '~/routes/v1/blogRoute'
import { authRoute } from '~/routes/v1/authRoute'
import { commentRoute } from '~/routes/v1/commentRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })

})

Router.use('/blogs', blogRoute)
Router.use('/auth', authRoute)
Router.use('/comment', commentRoute)



export const APIs_V1 = Router