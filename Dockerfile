# Sử dụng image node chính thức từ Docker Hub
FROM node:16

# Tạo thư mục app và đặt nó làm working directory
WORKDIR /app

# Copy package.json và package-lock.json vào working directory
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào working directory
COPY . .

# Mở port mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi động ứng dụng
CMD ["node", "index.js"]
