import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // フロント側は "/todos" を叩くだけでOK。
      // 開発サーバーがバックグラウンドでExpress(localhost:3000)に転送してくれるので
      // CORSの設定をExpress側に追加する必要がない。
      "/todos": "http://localhost:3000",
    },
  },
})
