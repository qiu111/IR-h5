src/
├── api/                # 接口请求层
│   └── user.ts         # 用户相关接口
├── assets/             # 静态资源
├── components/         # 通用组件
├── composables/        # 组合式函数
├── mock/               # Mock 数据
│   ├── index.ts        # Mock 统一导出
│   └── user.ts         # 用户模块 Mock
├── router/             # 路由配置
├── stores/             # Pinia 状态管理
├── styles/             # 全局样式
├── utils/              # 工具函数
├── views/              # 页面级组件
├── App.vue             # 根组件
├── env.d.ts            # 环境变量类型声明
└── main.ts             # 入口文件


# Vue 3 + TypeScript + Vite
这个脚手架配置包含了现代 Vue 3 开发所需的核心工具和配置，包括：
Vue 3 基础
TypeScript 支持
ESLint + Prettier 代码规范
Vue Router 4
<!-- Pinia 状态管理 -->
Axios HTTP 客户端
Vite 构建工具
Rem 适配 post-css:css转换工具
<!-- normalize.css 消除不同浏览器之间的样式差异，确保网页在不同浏览器和设备上表现一致 -->
sass

Mock 数据替换后端 API 接口
1、首先创建 mock 目录和各个接口的 mock 数据: src/mock/,,,,,
2、创建 mock 索引文件统一导出所有 mock 数据：src/mock/index.ts
3、修改 src/api/user.ts 使用 mock 数据替代真实请求：import { mockUser } from '@/mock/user';

用环境变量切换：VITE_USE_MOCK=true 时走 mock，false 时走真实接口
1、在.env.development 中添加 VITE_USE_MOCK=true
2、在.env.production 中添加 VITE_USE_MOCK=false
3、修改 src/api/user.ts,根据 VITE_USE_MOCK 切换 mock/实际接口  
4、确保 request.ts 的baseURL正确配置
5、添加类型声明支持import.meta.env.VITE_USE_MOCK


Nginx 部署示例
server {
  listen 80;
  server_name your-domain.com;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://backend-server;
  }
}