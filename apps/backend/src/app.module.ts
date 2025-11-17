import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // ← NOVO
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, AuthModule, TasksModule, ProfileModule], // ← NOVO
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
