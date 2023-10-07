import { defineConfig, loadEnv, type UserConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ mode }): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ArcoResolver()]
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      })
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
