import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    base: "./",
    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    }
})