import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
