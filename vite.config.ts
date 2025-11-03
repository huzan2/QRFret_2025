import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // vite가 /functions 디렉토리를 감시하지 않도록 설정
  server: {
    watch: {
      ignored: ['**/functions/**'],
    },
  },

  // 'react'를 import할 때 무조건 루트의 node_modules에서만 가져오도록 강제
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      recoil: path.resolve(__dirname, './node_modules/recoil'),
    },
  },
});
