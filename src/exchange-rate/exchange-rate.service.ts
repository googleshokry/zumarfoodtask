import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class ExchangeRateService {
  @Inject(TransactionsService)
  private readonly TransactionsServices: TransactionsService;

  async getExchangeRate(
    baseCurrency: string,
    targetCurrency: string,
    amount: number,
    user,
  ) {
    // get Exchange Rate From Thirty Party
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/644667c74c0c8eb987bd830e/latest/${baseCurrency}`
    );
    // Save Transaction
    const transaction = await this.TransactionsServices.create({
      baseCurrency: baseCurrency,
      targetCurrency: targetCurrency,
      amount: amount,
      userId: user.userId,
    });
    // Return Response Data
    return {
      transaction,
      converted: response.data.conversion_rates[targetCurrency],
    };
  }
}
