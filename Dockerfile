# 使用官方Node.js镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录为/app
WORKDIR /app

# 将当前目录下的所有文件复制到/app中
# 注意：这假设你的Dockerfile位于React项目的根目录下
COPY . /app

# 安装依赖
RUN npm install

# 构建React应用
RUN npm run build

# 如果你想在构建完成后执行一些清理工作（可选）
# RUN rm -rf node_modules && npm cache clean --force

# 由于我们只是在构建React应用，并没有启动服务，
# 所以这里不需要CMD或ENTRYPOINT指令来运行任何命令。
# 但是，如果你想要运行一个简单的静态文件服务器来查看构建产物，
# 你可以取消注释下面的行（注意：这通常不是生产环境的做法）
# CMD ["npx", "serve", "-s", "build"]

# 标记构建产物所在的目录，以便在构建完成后可以从Docker镜像中提取它们
# 注意：这不是Dockerfile的一个标准指令，但它可以帮助你了解构建产物在哪里
# VOLUME ["/app/build"]

# 注意：在实际部署中，你通常会将这个Docker镜像与另一个服务（如Nginx）结合使用，
# 该服务将配置为从/app/build目录提供静态文件。