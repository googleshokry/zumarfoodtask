import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDocument, Transaction } from './schemes/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private TransactionModel: Model<TransactionDocument>,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    // create new transaction save data userid, base currency and target currency and amount then return object info for this transaction
    return this.TransactionModel.create(createTransactionDto);
  }

  async findAll(user: any) {
    // find all transaction for user by user id sent in token
    return await this.TransactionModel.find({
      userId: user.userId,
    });
  }
}
