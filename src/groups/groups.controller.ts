import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from 'src/entities/group.entity';
import { CreateGroupDTO } from 'src/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from 'src/dtos/groups/update-group.dto';
import { GetGroupByIdDTO } from './InputsDTO/get-group-by-id.dto';

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
    //@UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
    async getGroupById(@Param('id', ParseIntPipe)id: number, @Query() query: GetGroupByIdDTO) {
        try{
            const group = await this.groupsService.getGroupById(id, query);
            return group;
        }catch(Error){
            throw new HttpException('Group not found',404);
        }
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
