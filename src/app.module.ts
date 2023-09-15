import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { TransactionsModule } from './transactions/transactions.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    UserModule,
    AuthModule,
    ExchangeRateModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
