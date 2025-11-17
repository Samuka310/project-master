import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard) // Protege rotas com autenticação
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // GET /profile - Buscar perfil do usuário logado
  @Get()
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.id);
  }

  // PUT /profile - Atualizar perfil
  @Put()
  async updateProfile(@Request() req, @Body() data: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.id, data);
  }

  // GET /profile/stats - Buscar estatísticas
  @Get('stats')
  async getStats(@Request() req) {
    return this.profileService.getStats(req.user.id);
  }
}
