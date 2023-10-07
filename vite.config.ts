import { defineConfig, loadEnv, type UserConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue()
    ],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: true
        }
      }
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src')
      }
    }
  })
}
