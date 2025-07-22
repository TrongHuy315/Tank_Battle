// Thực hiện chuyển những value từ .env qua js cho thống nhất trong tất cả các file khi dùng

module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
};
