// Thực hiện cấu hình Redis

module.exports = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
};
