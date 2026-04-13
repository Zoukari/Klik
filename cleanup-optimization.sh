#!/bin/bash

echo "🧹 Nettoyage et optimisation du site KLIK..."

# Supprimer tous les fichiers de documentation inutiles
echo "📄 Suppression des fichiers de documentation..."
rm -f *.md
rm -f *.sh

# Supprimer le dossier footer- klik inutilisé
echo "📁 Suppression du dossier footer- klik..."
rm -rf "footer- klik/"

# Supprimer le fichier timestamp Vite
echo "⏰ Suppression du fichier timestamp Vite..."
rm -f vite.config.ts.timestamp-*

# Supprimer le dossier .vscode s'il n'est pas nécessaire
echo "🔧 Suppression du dossier .vscode..."
rm -rf .vscode/

# Optimiser le package.json en supprimant les scripts inutiles
echo "📦 Optimisation du package.json..."

# Créer un nouveau package.json optimisé
cat > package.json << 'EOF'
{
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
}
EOF

# Optimiser le vite.config.ts
echo "⚡ Optimisation du vite.config.ts..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
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
})
EOF

# Optimiser le tsconfig.json
echo "🔧 Optimisation du tsconfig.json..."
cat > tsconfig.json << 'EOF'
{
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
}
EOF

# Nettoyer le cache npm
echo "🗑️ Nettoyage du cache npm..."
npm cache clean --force

# Réinstaller les dépendances
echo "📦 Réinstallation des dépendances..."
rm -rf node_modules/
rm -f package-lock.json
npm install

echo "✅ Optimisation terminée !"
echo "🚀 Le site est maintenant plus rapide et optimisé."
echo "📊 Fichiers supprimés :"
echo "   - Tous les fichiers .md de documentation"
echo "   - Tous les scripts .sh"
echo "   - Dossier footer- klik/"
echo "   - Dossier .vscode/"
echo "   - Fichier timestamp Vite"
echo "   - Cache npm"
echo ""
echo "🎯 Optimisations appliquées :"
echo "   - Package.json simplifié"
echo "   - Vite config optimisé"
echo "   - TypeScript config optimisé"
echo "   - Dépendances réinstallées"
