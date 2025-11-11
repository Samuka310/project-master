import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express'; // 👈 importa o tipo Request

// 👇 Crie uma interface para tipar o usuário dentro de req
interface AuthenticatedRequest extends ExpressRequest {
  user: {
    id: string;
    email?: string;
    // outros campos que você adicionou no payload do JWT
  };
}

@ApiTags('tasks')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  create(
    @Request() req: AuthenticatedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.id, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas' })
  findAll(@Request() req: AuthenticatedRequest) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada' })
  update(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, req.user.id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa deletada' })
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tasksService.remove(id, req.user.id);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Marcar como concluída/não concluída' })
  @ApiResponse({ status: 200, description: 'Status atualizado' })
  toggleComplete(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.tasksService.toggleComplete(id, req.user.id);
  }
}
