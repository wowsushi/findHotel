import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: /^http:\/\/(localhost:)|(findhotel\.site)/,
      credentials: true,
    },
  })

  ;(app as any).set('etag', false)
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by')
    res.removeHeader('date')
    next()
  })

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3333

  await app.listen(port)
}
bootstrap()
