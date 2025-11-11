import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria uma nova tarefa para o usuário autenticado
   */
  async create(userId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  /**
   * Lista todas as tarefas do usuário autenticado
   */
  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Busca uma tarefa específica (com verificação de propriedade)
   */
  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    // Verifica se a tarefa pertence ao usuário autenticado
    if (task.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta tarefa',
      );
    }

    return task;
  }

  /**
   * Atualiza uma tarefa (com verificação de propriedade)
   */
  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    // Verifica se a tarefa existe e pertence ao usuário
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  /**
   * Remove uma tarefa (com verificação de propriedade)
   */
  async remove(id: string, userId: string) {
    // Verifica se a tarefa existe e pertence ao usuário
    await this.findOne(id, userId);

    return this.prisma.task.delete({
      where: { id },
    });
  }

  /**
   * Marca tarefa como concluída/não concluída
   */
  async toggleComplete(id: string, userId: string) {
    const task = await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
  }
}
