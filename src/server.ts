import { app } from './app'
import { env } from './env/env'

app.listen({ port: env.PORT }).then(() => {
  console.log('🚀 Server is running! http://localhost:' + env.PORT)
})
