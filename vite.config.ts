import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const allowedHost = env.VITE_HOST;

  return {
    server: {
      host: true,
      allowedHosts: allowedHost ? [allowedHost] : [],
    },
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@': '/src',
        '@app': '/src/app',
        '@pages': '/src/pages',
        '@shared': '/src/shared',
        '@features': '/src/features',
        '@entities': '/src/entities',
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    esbuild: {
      sourcemap: false,
    },
  };
});
