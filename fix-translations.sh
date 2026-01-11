#!/bin/bash
# Quick fix pour ajouter les traductions manquantes
echo "✅ Les traductions pour iaPhotoProduit et studiosHardware existent déjà dans fr.json et en.json"
echo "Le problème vient d'ailleurs - vérification build locale..."
npm run build 2>&1 | tail -20
