import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const PORT = +process.env.NODE_ENV || 8001
    const app = await NestFactory.create(AppModule)
    await app.listen(PORT, () => console.log(`✔️ User service server http://localhost:${PORT}/users`))
}

bootstrap()
