import { Inject, Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@app/config";
import { UserResponseInterface } from "./types/userResponse.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    async createUser(createDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            where: { email: createDto.email },
        })

        const userByUsername = await this.userRepository.findOne({
            where: { username: createDto.username },
        })
        if (userByEmail || userByUsername) {
            throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
            // const errors = { username: 'Username and email must be unique' };
            // throw new Error(JSON.stringify(errors));
        }
        const newUser = new UserEntity();
        Object.assign(newUser, createDto);
        console.log('newUser: ', newUser);

        return await this.userRepository.save(newUser);
    }

    generateJWT(user: UserEntity) {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, JWT_SECRET)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJWT(user),
            },
        };
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email },
        })
        if (!user) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        
        const isPasswordCorret = await compare(loginUserDto.password, user.password);
        if (!isPasswordCorret) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return user;
    }
}