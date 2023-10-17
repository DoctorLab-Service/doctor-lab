import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))},
			{find: '@images', replacement: fileURLToPath(new URL('./src/assets/images', import.meta.url))},
			{find: '@icons', replacement: fileURLToPath(new URL('./src/assets/icons', import.meta.url))},
			{find: '@shared', replacement: fileURLToPath(new URL('./src/shared', import.meta.url))},
			{find: '@store', replacement: fileURLToPath(new URL('./src/store', import.meta.url))},
			{find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url))},
			{find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url))},
		],
	},
	optimizeDeps: {
		exclude: ['js-big-decimal']
	},
})
