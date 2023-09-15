import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate.controller';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './exchange-rate.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [HttpModule, TransactionsModule],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
})
export class ExchangeRateModule {}
