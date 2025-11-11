import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // NOVO

export class LoginDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  }) // NOVO
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @ApiProperty({ example: 'joao@exemplo.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({
    example: 'Senha123',
    description: 'Senha com letras maiúsculas, minúsculas e números',
  }) // NOVO
  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password: string;
}
