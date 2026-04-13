const fs = require('fs');
const path = require('path');

console.log('🧹 Nettoyage et optimisation du site KLIK...');

// Liste des fichiers à supprimer
const filesToDelete = [
  'COMPLETE-TRANSLATION-FIXES.md',
  'TRILINGUAL-FEATURES.md',
  'COMPLETE-TRANSLATION.md',
  'LANGUAGE-FEATURE.md',
  'SEO-PERFORMANCE-OPTIMIZATIONS.md',
  'FIXES-APPLIED.md',
  'FORM-CONFIGURED.md',
  'WEB3FORMS-SETUP.md',
  'FORMSPREE-SETUP.md',
  'FORM-IMPROVEMENTS.md',
  'FORM-CONFIGURATION.md',
  'SEO-OPTIMIZATIONS.md',
  'AMELIORATIONS-DESIGN.md',
  'PERFORMANCE-OPTIMIZATIONS.md',
  'cleanup-files.sh',
  'diagnose.sh',
  'DEBUG-README.md',
  'fix-install.sh',
  'debug.sh',
  'start-dev.sh',
  'NO-HOVER-EFFECTS.md',
  'cleanup.sh',
  'vite.config.ts.timestamp-1744536225703-78163b2a2385b.mjs'
];

// Supprimer les fichiers
filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`✅ Supprimé: ${file}`);
  }
});

// Supprimer les dossiers
const dirsToDelete = [
  'footer- klik',
  '.vscode'
];

dirsToDelete.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`✅ Supprimé: ${dir}/`);
  }
});

// Optimiser package.json
const packageJson = {
  "name": "klik-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "npx vite",
    "build": "npx vite build",
    "preview": "npx vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json optimisé');

// Optimiser vite.config.ts
const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: true,
    port: 5176
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})`;

fs.writeFileSync('vite.config.ts', viteConfig);
console.log('✅ Vite config optimisé');

// Optimiser tsconfig.json
const tsConfig = {
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
};

fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
console.log('✅ TypeScript config optimisé');

console.log('\\n✅ Optimisation terminée !');
console.log('🚀 Le site est maintenant plus rapide et optimisé.');
console.log('\\n📊 Fichiers supprimés :');
console.log('   - Tous les fichiers .md de documentation');
console.log('   - Tous les scripts .sh');
console.log('   - Dossier footer- klik/');
console.log('   - Dossier .vscode/');
console.log('   - Fichier timestamp Vite');
console.log('\\n🎯 Optimisations appliquées :');
console.log('   - Package.json simplifié');
console.log('   - Vite config optimisé');
console.log('   - TypeScript config optimisé');
console.log('   - Suppression des fichiers inutiles');
