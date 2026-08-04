###  Vue 3 + TypeScript + Vite
 **Vue 3** — 使用 Composition API + `<script setup>` 语法糖
 **TypeScript** — 全量 TypeScript 开发，类型安全
 **Vite** — 极速冷启动与热更新
 **ESLint + Prettier** — 统一代码风格，自动格式化
 **Vue Router 4** — 路由管理
 **Pinia** — 轻量直观的状态管理
 **Axios** — 封装好的 HTTP 客户端
 **Sass** — CSS 预处理器
 **PostCSS + Rem** — 移动端 Rem 适配方案
 **Normalize.css** — 统一浏览器默认样式
 **Mock 数据** — 环境变量一键切换 Mock / 真实接口

### Mock 数据替换后端 API 接口
 **1、首先创建 mock 目录和各个接口的 mock 数据: src/mock/,,,,,
 **2、创建 mock 索引文件统一导出所有 mock 数据：src/mock/index.ts
 **3、修改 src/api/user.ts 使用 mock 数据替代真实请求：import { mockUser } from '@/mock/user';

### 用环境变量切换：VITE_USE_MOCK=true 时走 mock，false 时走真实接口
 **1、在.env.development 中添加 VITE_USE_MOCK=true   ──►  返回 src/mock/ 中的模拟数据
 **2、在.env.production 中添加 VITE_USE_MOCK=false   ──►  发起真实 HTTP 请求到 VITE_API_BASE_URL
 **3、修改 src/api/user.ts,根据 VITE_USE_MOCK 切换 mock/实际接口  
 **4、确保 request.ts 的baseURL正确配置
 **5、添加类型声明支持import.meta.env.VITE_USE_MOCK

```
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
```


### Nginx 部署示例
```nginx
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
```