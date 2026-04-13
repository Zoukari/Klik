import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// GITHUB_PAGES env is set in the GitHub Actions workflow
export default defineConfig(() => ({
  base: process.env.GITHUB_PAGES ? '/Kliknew/' : '/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
    cssMinify: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@sanity') || id.includes('@portabletext') || id.includes('dompurify')) {
            return 'cms';
          }
          if (id.includes('react-router')) return 'router';
          if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
        },
      },
    },
  },
  server: {
    host: true,
    port: 5176,
    proxy: {
      // Évite les erreurs CORS en dev : les requêtes Sanity passent par le serveur Vite
      '/api/sanity': {
        target: 'https://ilu5dvrl.apicdn.sanity.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sanity/, ''),
      },
    },
  },
}));
