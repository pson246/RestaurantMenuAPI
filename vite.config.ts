import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext'
        }
    },  
    build: {
        target: 'esnext'
    },
    server: {
        host: true,
        port: 8080
    },
    base: './',
});
