# PacDog : PacMan simplifié, version chien

## Description

**PacDog** est un jeu interactif où le joueur contrôle un chien qui doit se déplacer dans un labyrinthe pour attraper des os tout en évitant les collisions avec des murs. Le but est d'attraper autant d'os que possible avant que le temps ne soit écoulé, tout en naviguant dans un labyrinthe rempli de murs.

## Fonctionnalités

- **Déplacement du chien :** Utilise les flèches directionnelles pour déplacer le chien à travers l'aire de jeu.
- **Attraper les os :** Le chien doit se déplacer vers les os pour les manger. Chaque os attrapé augmente le score.
- **Collisions avec les murs :** Si le chien touche un mur, il "meurt" et le jeu s'arrête.
- **Chronomètre :** Un compte à rebours limite la durée du jeu. Le joueur doit essayer de capturer le maximum d'os avant la fin du temps imparti.
- **Score :** Le score est mis à jour à chaque fois que le chien mange un os. Le score final est affiché à la fin du jeu.

## Installation

1. Clonez ce dépôt ou téléchargez les fichiers du projet :
```bash
git clone https://github.com/RomaneCollomb/pacdog
```

2. Accédez au répertoire du projet :
```bash
cd pacdog
```

3. Ouvrez le fichier 'index.html' dans votre navigateur préféré pour commencer à jouer.

## Comment jouer
- **Lancez le jeu en appuyant sur la touche Espace de votre clavier.**
- **Utilisez les flèches directionnelles pour déplacer le chien :**
Flèche haut : Déplacer le chien vers le haut.
Flèche bas : Déplacer le chien vers le bas.
Flèche gauche : Déplacer le chien vers la gauche.
Flèche droite : Déplacer le chien vers la droite.
- **Collectez les os** : attrapez les os du labyrinthe pour gagner des points.
- **Évitez les murs à tout prix !** Si par mégarde votre chien heurte le mur, il meur et la partie se termine ! 
- **Le jeu dure 30 secondes.** Essayez d'attraper le plus d'os possible avant la fin du temps imparti.

## Structure des fichiers
- *index.html :* Fichier HTML principal contenant la structure du jeu.
- *pacdog.js :* Fichier JavaScript gérant la logique du jeu (mouvement, collisions, score, etc.).
- *styles.css :* Fichier CSS définissant l'apparence du jeu (labyrinthe, chien, os, etc.).

## Auteur
Romane Collomb