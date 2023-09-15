import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  baseCurrency: string;
  @Prop({ required: true })
  targetCurrency: string;
  @Prop({ required: true })
  amount: string;
  @Prop({ required: true })
  userId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
