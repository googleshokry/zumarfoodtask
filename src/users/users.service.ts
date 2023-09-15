import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { User, UserDocument } from './schemes/user.schema';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  private transactionsServices: TransactionsService;
  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    // validate DTO

    const createUser = new this.userModel(createUserDto);
    // check if user exists
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      throw new BadRequestException();
    }
    // Hash Password
    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );
    await createUser.save();
    return { username: createUser.username, messsage: 'created' };
  }

  async getHistoryByUser(user: any) {
    return await this.transactionsServices.findAll(user);
  }
}
