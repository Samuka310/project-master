import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // NOVO

export class UpdateTaskDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  }) // NOVO
  @IsString()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'joao@exemplo.com', description: 'Email do usuário' }) // NOVO
  @MaxLength(100, { message: 'Título deve ter no máximo 100 caracteres' })
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
  description?: string;

  @ApiProperty({
    example: 'Senha123',
    description: 'Senha com letras maiúsculas, minúsculas e números',
  }) // NOVO
  @IsBoolean({ message: 'Completed deve ser booleano (true/false)' })
  @IsOptional()
  completed?: boolean;
}
