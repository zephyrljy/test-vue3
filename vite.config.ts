import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite"; // 自动导入vue3函数包
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"; // 引入ui

import * as path from "path";
// 自动导入config
const componentsConfig = {
  dts: true, // 使用ts时
  resolvers: [AntDesignVueResolver()],
};

const autoImportConfig = {
  imports: ["vue", "vue-router", {}],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components(componentsConfig), AutoImport(autoImportConfig)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
