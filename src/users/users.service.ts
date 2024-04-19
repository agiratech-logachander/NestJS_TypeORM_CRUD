import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from './utils/types';
import { Profile } from 'src/typeorm/entities/Profile';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
              @InjectRepository(Profile) private profileRepo : Repository<Profile>
  ) {}

  fetchUsers = () => {
    return this.userRepo.find();
  };

  createUsers(createUserDetails: CreateUserParams) {
    const newUser = this.userRepo.create({
      ...createUserDetails,
      createdAt: new Date(),
    });

    return this.userRepo.save(newUser);
  }

  updateUser(id: number, UpdateUserParams: UpdateUserParams) {
    return {
      message: 'Updated Successfully',

      User: this.userRepo.update({ id }, { ...UpdateUserParams }),
    };
  }


  deleteUser(id:number){
        return "User is Deleted Successfully "+this.userRepo.delete({id})
  }

  //Service for Profiles

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepo.create(createUserProfileDetails);
    const savedProfile = await this.profileRepo.save(newProfile);
    user.profile = savedProfile;
    return this.userRepo.save(user);
  }
}






