# Tank_Battle  
Dự án web game có chủ đề xe tăng được thực hiện trong mùa hè năm 2025.  
Game Tank Battle mang phong cách chiến đấu ma trận cổ điển nhưng vẫn đầy sức hấp dẫn bởi những tựa game về chiến đấu chưa bao giờ là hạ nhiệt ở bất cứ thời điểm nào trong lịch sử.  
Để hiểu rõ hơn về tựa game được nhóm phát triển, hãy tham khảo thông qua cấu trúc thư mục dự án trước.  

```
    tank-game/
    │
    ├── public/                   # Static files (HTML, CSS, client-side JS, ảnh...)
    │   ├── css/
    │   ├── js/
    │   └── html/                 # Chứa các trang nội dung
    |   │
    │   └── assets/               # Ảnh, icon, âm thanh,...
    │       ├── tanks/
    │       ├── bullets/
    │       └── sounds/
    │
    ├── src/                      # Mã nguồn chính
    │   ├── controllers/          # Xử lý logic cho routes, user, trận đấu
    │   │   ├── user.controller.js
    │   │   ├── match.controller.js
    │   │   └── lobby.controller.js
    │   │
    │   ├── models/               # MySQL model (dùng Sequelize hoặc raw query)
    │   │   ├── user.model.js
    │   │   ├── match.model.js
    │   │   └── index.js          # Khởi tạo DB connection
    │   │
    │   ├── redis/                # Redis helpers
    │   │   └── lobby.redis.js    # Lưu phòng chờ, người chơi tạm thời
    │   │
    │   ├── routes/               # API routes
    │   │   ├── user.routes.js
    │   │   ├── match.routes.js
    │   │   └── lobby.routes.js
    │   │
    │   ├── socket/               # Socket.IO handlers
    │   │   ├── index.js          # Khởi tạo socket, lắng nghe kết nối
    │   │   └── game.handler.js   # Logic real-time bắn xe tăng
    │   │
    │   ├── utils/                # Các hàm tiện ích chung
    │   │   └── validator.js
    │   │
    │   ├── config/               # Cấu hình hệ thống
    │   │   ├── db.config.js      # Cấu hình MySQL
    │   │   ├── redis.config.js   # Kết nối Redis
    │   │   └── app.config.js     # Port, secret keys, ...
    │   │
    │   └── app.js                # Tạo express app, middleware, routes
    │
    ├── server.js                 # Entry point: chạy app + socket
    │
    ├── .env                      # Biến môi trường (DB, Redis, PORT, v.v.)
    ├── .gitignore
    ├── package.json
    └── README.md
```

### Hướng dẫn
Thực hiện khởi tạo dự án NodeJS với folder bình thường, chạy lệnh: `npm init`.  
Cấu hình về thông tin của project được lưu trong file **package.json**.  

Sau khi biến một folder bình thường thành một **Node Project**, thực hiện lệnh cài đặt thư viện về thư mục dự án **node_modules**: `npm install express socket.io mysql2 redis dotenv`.  
Thực hiện lệnh `npm install -g nodemon` để cài thư viện **nodemon** cho tác vụ tự động load sau khi các file được *save*.  

Để chạy chương trình, chạy lệnh sau: `nodemon server.js` hoặc `npm run dev`.  
