export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'seu-super-secret-jwt-key-mude-em-producao',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
