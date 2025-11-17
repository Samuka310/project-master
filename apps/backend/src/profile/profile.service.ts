import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // Buscar perfil do usuário
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        // NÃO retorna password!
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  // Atualizar perfil
  async updateProfile(userId: string, data: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  // Buscar estatísticas do usuário
  async getStats(userId: string) {
    const totalTasks = await this.prisma.task.count({
      where: { userId },
    });

    const completedTasks = await this.prisma.task.count({
      where: { userId, completed: true },
    });

    const pendingTasks = totalTasks - completedTasks;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
    };
  }
}
