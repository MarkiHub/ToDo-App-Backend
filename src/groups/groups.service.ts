import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDTO } from 'src/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from 'src/dtos/groups/update-group.dto';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetGroupByIdDTO } from './InputsDTO/get-group-by-id.dto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createGroup(groupDto: CreateGroupDTO, user:User): Promise<Group> {
        // const userEntity = await this.userRepository.findOneBy({id: groupDto.adminId});

        // if (!userEntity) {
        //     throw new Error('User not found');
        // }
        
        const group = this.groupRepository.create({...groupDto, admin: user});
        return await this.groupRepository.save(group);
    }

    async getGroups(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async getGroupById(id: number, query: GetGroupByIdDTO): Promise<Group> {    
        const group = await this.groupRepository.findOne(
            {where: {id}, relations: {members: query.members, tasks: query.tasks}},
        );
        
        if(!group) {
            throw new HttpException('Group not found',404);
        }

        return group;
    }

    async updateGroup(id: number, groupDto: UpdateGroupDTO) {
        return await this.groupRepository.update(id, groupDto);
    }

    async deleteGroup(id: number) {
        await this.groupRepository.delete(id);
    }
    
    async addUserToGroup(groupId: number, code: string) {
        const group = await this.groupRepository.findOne({where: {id: groupId}, relations: ['members']});
        const user = await this.userRepository.findOne({where: {code:code}});

        if (!group) {
            throw new HttpException('Group not found',404);
        }

        if (!user) {
            throw new HttpException('User not found',404);
        }

        group.members.push(user);
        await this.groupRepository.save(group);
    }
}
