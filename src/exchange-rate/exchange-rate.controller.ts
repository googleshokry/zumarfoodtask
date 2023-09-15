import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ExchangeRateController {
  constructor(private exchangeRateService: ExchangeRateService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('convert')
  async getExchangeRate(
    @Body('baseCurrency') baseCurrency: string,
    @Body('targetCurrency') targetCurrency: string,
    @Body('amount') amount: number,
    @Request() req: any,
  ) {
    return await this.exchangeRateService.getExchangeRate(
      baseCurrency,
      targetCurrency,
      amount,
      req.user,
    );
  }
}
