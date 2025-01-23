import { defineConfig, loadEnv, type UserConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default ({ mode }): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [],
      }),
      Components({
        resolvers: [],
      }),
    ],
    server: {
      proxy: {
        '/api/v1': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
  })
}
