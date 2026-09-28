import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      {
        name: 'github-pages-static-bundle-bridge',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html
              .replace('<link rel="stylesheet" href="./bundle/app.css" />', '')
              .replace(
                '<script type="module" src="./bundle/app.js"></script>',
                '<script type="module" src="/src/main.tsx"></script>',
              );
          },
        },
        closeBundle() {
          const srcDir = path.resolve(__dirname, 'dist/assets');
          const destDir = path.resolve(__dirname, 'bundle');
          if (fs.existsSync(srcDir)) {
            fs.mkdirSync(destDir, {recursive: true});
            for (const file of fs.readdirSync(srcDir)) {
              fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
            }
          }
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/app.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/app.css';
            }
            return 'assets/[name][extname]';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
