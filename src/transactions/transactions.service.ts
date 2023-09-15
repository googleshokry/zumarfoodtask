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
    return this.TransactionModel.create(createTransactionDto);
  }

  findAll() {
    return this.TransactionModel.find();
  }
}
