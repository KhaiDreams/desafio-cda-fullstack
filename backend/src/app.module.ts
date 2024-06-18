import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { LoginController } from './controllers/login/login.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserController } from './controllers/user/user.controller';
import { RankingService } from './services/ranking/ranking.service';
import { MailerService } from './services/mailer/mailer.controller';
import { RankingController } from './controllers/ranking/ranking.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    RegisterController,
    LoginController,
    UserController,
    RankingController,
  ],
  providers: [
    AppService,
    RegisterService,
    RankingService,
    MailerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'login', method: RequestMethod.POST },
        { path: 'register', method: RequestMethod.POST },
      );
  }
}
