import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { join } from 'path';

// ✅ CORREÇÃO: busca o .env na raiz do projeto backend
// Em desenvolvimento: apps/backend/.env
// Em produção (dist): apps/backend/.env (ainda funciona!)
const envPath = join(process.cwd(), '.env');
dotenv.config({ path: envPath });

console.log('🔍 Buscando .env em:', envPath);
console.log(
  '🧩 DATABASE_URL carregada:',
  process.env.DATABASE_URL ? '✅ Definida' : '❌ Undefined',
);

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma conectado ao banco de dados');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Prisma desconectado do banco de dados');
  }
}
