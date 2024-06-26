import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
// import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()
  // app.use(cors(corsOptions))
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  app.use('/v1', APIs_V1)

  // app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production Hello ${env.AUTHOR}, I am running at Port: ${process.env.PORT}`)
    })
  } else {
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Local Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
    })
  }


  exitHook(() => {
    console.log('exit app')
    CLOSE_DB()
  })

}

CONNECT_DB()
  .then(() => console.log('Ket noi toi MongoDB thanh cong'))
  .then(() => START_SERVER())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })
