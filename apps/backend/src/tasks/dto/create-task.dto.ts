import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // NOVO

export class CreateTaskDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  }) // NOVO
  @IsString()
  @ApiProperty({ example: 'joao@exemplo.com', description: 'Email do usuário' }) // NOVO
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MaxLength(100, { message: 'Título deve ter no máximo 100 caracteres' })
  title: string;

  @ApiProperty({
    example: 'Senha123',
    description: 'Senha com letras maiúsculas, minúsculas e números',
  }) // NOVO
  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
  description?: string;
}
