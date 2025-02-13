import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from 'src/entities/group.entity';
import { CreateGroupDTO } from 'src/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from 'src/dtos/groups/update-group.dto';

@Controller('groups')
export class GroupsController {
    
    constructor(
        private groupsService: GroupsService
    ) {}

    @Post()
    async createGroup(@Body() newGroup: CreateGroupDTO): Promise<Group> {
        return await this.groupsService.createGroup(newGroup).then(group =>{
            return group;
        }).catch(error => {
            throw error;
    } );}

    @Get()
    async getGroups(): Promise<Group[]> {
        return await this.groupsService.getGroups().then(groups => {
            return groups;
        }).catch(error => {
            throw error;
        });
    }

    @Get(':id')
    async getGroupById(id: number) {
        return await this.groupsService.getGroupById(id).then(group => {
            return group;
        }).catch(error => {
            throw error;
        });
    }

    @Patch(':id')
    async updateGroup(id: number, @Body() group: UpdateGroupDTO) {
        return await this.groupsService.updateGroup(id, group).then(group => {
            return group;
        }).catch(error => {
            throw error;
        });
    }

    @Delete(':id')
    async deleteGroup(id: number) {
        return await this.groupsService.deleteGroup(id).then(group => {
            return group;
        }).catch(error => {
            throw error;
        });
    }

    @Patch(':groupId/add-user/:code')
    @HttpCode(201)
    async addUserToGroup(@Param("groupId", ParseIntPipe) groupId: number, @Param("code") code: string) {
        return await this.groupsService.addUserToGroup(groupId, code).then(group => {
            return group;
        }).catch(error => {
            throw error;
        });
    }
}
