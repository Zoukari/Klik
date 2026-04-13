#!/bin/bash

# Script pour démarrer le serveur de développement
echo "🚀 Démarrage du serveur de développement KLIK..."

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Essayer différentes méthodes pour lancer Vite
echo "🔍 Tentative de lancement de Vite..."

# Méthode 1: npx
if command -v npx &> /dev/null; then
    echo "✅ Utilisation de npx..."
    npx vite --host 0.0.0.0 --port 5176
elif [ -f "./node_modules/.bin/vite" ]; then
    echo "✅ Utilisation du binaire local..."
    ./node_modules/.bin/vite --host 0.0.0.0 --port 5176
else
    echo "❌ Vite non trouvé. Réinstallation des dépendances..."
    npm install
    npx vite --host 0.0.0.0 --port 5176
fi
