import 'dotenv/config';

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
}

export const config = {
    dbHost: requireEnv('DB_HOST'),
    dbUser: requireEnv('DB_USER'),
    dbPassword: requireEnv('DB_PASSWORD'),
    dbName: requireEnv('DB_NAME'),
    dbPort: Number(process.env.DB_PORT || '5432'),
    port: Number(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: requireEnv('JWT_SECRET') || 'your_default_secret',
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
};
