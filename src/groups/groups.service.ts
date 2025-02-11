import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDTO } from 'src/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from 'src/dtos/groups/update-group.dto';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createGroup(groupDto: CreateGroupDTO): Promise<Group> {
        const userEntity = await this.userRepository.findOneBy({id: groupDto.adminId});

        if (!userEntity) {
            throw new Error('User not found');
        }

        const group = this.groupRepository.create({...groupDto, admin: userEntity});
        return await this.groupRepository.save(group);
    }

    async getGroups(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async getGroupById(id: number) {    
        return await this.groupRepository.findOne(
            {where: {id}}
        );
    }

    async updateGroup(id: number, groupDto: UpdateGroupDTO) {
        return await this.groupRepository.update(id, groupDto);
    }

    async deleteGroup(id: number) {
        await this.groupRepository.delete(id);
    }
 
}
