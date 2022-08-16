import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import configTsPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh(), configTsPaths()],
    esbuild: {
        loader: 'tsx'
    }
});
