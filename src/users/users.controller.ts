import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.dto';
import { UsersService } from './users.service';
import {updateUserDto}  from './UpdateUser.dto'
import { CreateUserProfileDto } from './CreateUserProfile.dto';

@Controller('users')
export class UsersController {

    
    constructor(private userService: UsersService){}
    @Get()
    getUsers(){
        
        return this.userService.fetchUsers();
    }


    @Post(`createUser`)
    createUser(@Body() createUserDto:CreateUserDto){

        return this.userService.createUsers(createUserDto);

    }

    @Put("updateUser/:id")
    async updateUserById(@Param('id', ParseIntPipe) id:number,
                   @Body() updateUserDto: updateUserDto
    ){
        await this.userService.updateUser(id,updateUserDto)
     }


     @Delete('/deleteUser/:id')
     async deleteUserById(@Param('id', ParseIntPipe) id:number){
        await this.userService.deleteUser(id)
     }


  
     @Post(':id/profiles')
     createUserProfile(
       @Param('id', ParseIntPipe) id: number,
       @Body() createUserProfileDto: CreateUserProfileDto,
     ) {
       return this.userService.createUserProfile(id,createUserProfileDto);
     }
  
    
}      

