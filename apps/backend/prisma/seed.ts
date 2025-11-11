import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (cuidado em produção!)
  console.log('🗑️  Limpando dados existentes...');
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuários de teste
  console.log('👤 Criando usuários...');
  const password = await bcrypt.hash('Senha123', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@exemplo.com',
      password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      password,
    },
  });

  console.log(`✅ Usuário criado: ${user1.name} (${user1.email})`);
  console.log(`✅ Usuário criado: ${user2.name} (${user2.email})`);

  // Criar tarefas para o usuário 1
  console.log('📝 Criando tarefas para João Silva...');

  const tasksUser1 = await prisma.task.createMany({
    data: [
      {
        title: 'Estudar NestJS',
        description: 'Aprender autenticação com JWT e Passport',
        completed: true,
        userId: user1.id,
      },
      {
        title: 'Implementar CRUD de Tasks',
        description: 'Criar endpoints de criação, listagem, edição e exclusão',
        completed: true,
        userId: user1.id,
      },
      {
        title: 'Configurar Prisma',
        description: 'Setup de migrations e seed do banco de dados',
        completed: false,
        userId: user1.id,
      },
      {
        title: 'Criar documentação Swagger',
        description: 'Adicionar decorators e configurar OpenAPI',
        completed: false,
        userId: user1.id,
      },
      {
        title: 'Integrar Frontend com Backend',
        description: 'Conectar Next.js com a API REST',
        completed: false,
        userId: user1.id,
      },
    ],
  });

  console.log(`✅ ${tasksUser1.count} tarefas criadas para ${user1.name}`);

  // Criar tarefas para o usuário 2
  console.log('📝 Criando tarefas para Maria Santos...');

  const tasksUser2 = await prisma.task.createMany({
    data: [
      {
        title: 'Aprender React Query',
        description: 'Estudar TanStack Query para cache de dados',
        completed: false,
        userId: user2.id,
      },
      {
        title: 'Configurar Tailwind CSS',
        description: 'Setup de temas e componentes personalizados',
        completed: true,
        userId: user2.id,
      },
      {
        title: 'Deploy em produção',
        description: 'Fazer deploy no Vercel e Railway',
        completed: false,
        userId: user2.id,
      },
    ],
  });

  console.log(`✅ ${tasksUser2.count} tarefas criadas para ${user2.name}`);

  console.log('');
  console.log('🎉 Seed concluído com sucesso!');
  console.log('');
  console.log('📌 Credenciais de acesso:');
  console.log('   Email: joao@exemplo.com ou maria@exemplo.com');
  console.log('   Senha: Senha123');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
