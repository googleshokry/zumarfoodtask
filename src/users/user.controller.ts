import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from "../transactions/transactions.service";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('username')
  getUserByUsername(@Param() param) {
    return this.userService.getUserByUsername(param.username);
  }
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    // create new user
    return this.userService.registerUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  getHistoryByUser(@Request() req: any) {
    // get history by user Id from token send in request
    return this.transactionsService.findAll(req.user);
  }
}
