import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/auth/login.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async registerUser(createUserDto: CreateUserDTO) {
    //return this.usersService.createUser(createUserDto);

    const findedUser = await this.usersRepository.findOneBy({ name: createUserDto.name }) ;

    if(findedUser) {
      throw new HttpException("There's already a user with that name", 400) ;
    }

    const user = this.usersRepository.create(createUserDto) ;
    
    return await this.usersRepository.save(user) ;
  }

  async findByNameAndPassword(loginDto: LoginDto) {
    
    const loggedUser = await this.usersRepository.findOneBy({
      name: loginDto.name,
      password: loginDto.password
    }) ;

    if(!loggedUser) {
      throw new HttpException("There's something wrong with your data", 404) ;
    }

    return loggedUser ;
  }
}
