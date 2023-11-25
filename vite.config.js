import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';

// 自动引入相关模块
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// 包依赖分析可视化
// import {visualizer} from "rollup-plugin-visualizer"

// 代码压缩 nginx需要开始gzip
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    // visualizer(),
    viteCompression(),
    AutoImport({
      //包含的文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      //auto-import.d.ts 使用ts建议开启
      dts: false,
      // vue vue-router vuex中的方法自动导入
      imports: ['vue', 'vue-router', 'pinia'],
    }),
    Components({
      dts: false, //components.d.ts会自动生成 默认生成在src/
      dirs: ['src/components'],
      extensions: ['vue', 'tsx', 'jsx'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
          importLess: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      //src目录的配置
      '@': path.resolve(__dirname, 'src'),
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  // 自定义样式
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 此处也可设置直角、边框色、字体大小等
          // 'primary-color': '#0F48B3',
          // 'link-color': '#073894',
          // 'border-radius-base': '2px',
          // 配合configProvider组件使用
          // '@ant-prefix': 'platform-ant',
        },
        sourceMap: false,
        javascriptEnabled: true,
      },
    },
  }
})