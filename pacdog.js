// Variables
const gameArea = document.getElementById('gameArea');
const dog = document.getElementById('dog');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const instructionsElement = document.getElementById('instructions');

const dogSize = 40; // Taille du chien
let dogPosition = { x: 50, y: 50 }; // Position initiale du chien
let score = 0;
const bones = [];
let walls = [];
let timer = 30;
let gameStarted = false;
let timerInterval; // Variable pour stocker l'intervalle du chronomètre

// Créer des os à manger
function createBones() {
    for (let i = 0; i < 5; i++) {
        const bone = document.createElement('div');
        bone.classList.add('bone');
        bone.style.left = `${Math.random() * (gameArea.offsetWidth - 20)}px`;
        bone.style.top = `${Math.random() * (gameArea.offsetHeight - 20)}px`;
        gameArea.appendChild(bone);
        bones.push(bone);
    }
}

// Créer des murs (labyrinthe) aléatoires
function createWalls() {
    const numberOfWalls = 10; // Nombre de murs
    const wallThickness = 20; // Épaisseur des murs
    for (let i = 0; i < numberOfWalls; i++) {
        const wall = document.createElement('div');
        wall.classList.add('wall');
        wall.style.width = `${Math.random() * 200 + 50}px`; // Largeur aléatoire
        wall.style.height = `${wallThickness}px`; // Hauteur fixe (épaisseur)
        wall.style.left = `${Math.random() * (gameArea.offsetWidth - parseInt(wall.style.width))}px`;
        wall.style.top = `${Math.random() * (gameArea.offsetHeight - parseInt(wall.style.height))}px`;
        gameArea.appendChild(wall);
        walls.push(wall);
    }
}

// Vérifier si le chien touche un mur ou une bordure
function checkCollision() {
    const dogRect = dog.getBoundingClientRect();

    // Vérification des collisions avec les murs
    for (let i = 0; i < walls.length; i++) {
        const wallRect = walls[i].getBoundingClientRect();
        if (
            dogRect.left < wallRect.right &&
            dogRect.right > wallRect.left &&
            dogRect.top < wallRect.bottom &&
            dogRect.bottom > wallRect.top
        ) {
            // Collision avec un mur
            return true;
        }
    }

    // Vérification des collisions avec les bordures
    if (dogPosition.x < 0 || dogPosition.x > gameArea.offsetWidth - dogSize || dogPosition.y < 0 || dogPosition.y > gameArea.offsetHeight - dogSize) {
        // Collision avec une bordure
        return true;
    }

    return false;
}

// Mise à jour de la position du chien
function updateDogPosition() {
    dog.style.left = `${dogPosition.x}px`;
    dog.style.top = `${dogPosition.y}px`;
}

// Vérifier si le chien a mangé un os
function checkCollisions() {
    const dogRect = dog.getBoundingClientRect();
    bones.forEach((bone, index) => {
        const boneRect = bone.getBoundingClientRect();
        if (
            dogRect.left < boneRect.right &&
            dogRect.right > boneRect.left &&
            dogRect.top < boneRect.bottom &&
            dogRect.bottom > boneRect.top
        ) {
            // Réinitialiser l'os mangé
            bones.splice(index, 1);
            bone.remove();
            score++;
            scoreElement.textContent = `Score: ${score}`;

            // Créer un nouvel os
            const newBone = document.createElement('div');
            newBone.classList.add('bone');
            newBone.style.left = `${Math.random() * (gameArea.offsetWidth - 20)}px`;
            newBone.style.top = `${Math.random() * (gameArea.offsetHeight - 20)}px`;
            gameArea.appendChild(newBone);
            bones.push(newBone);
        }
    });
}

// Déplacer le chien
document.addEventListener('keydown', (event) => {
    if (!gameStarted) {
        // Commencer le jeu dès que la touche espace est appuyée
        if (event.code === 'Space') {
            startGame();
        }
        return; // Ne pas bouger tant que le jeu n'est pas commencé
    }

    const step = 10; // Distance parcourue par pression de touche
    const initialPosition = { ...dogPosition }; // Position initiale avant déplacement

    if (event.key === 'ArrowUp') {
        dogPosition.y = Math.max(dogPosition.y - step, 0);
    } else if (event.key === 'ArrowDown') {
        dogPosition.y = Math.min(dogPosition.y + step, gameArea.offsetHeight - dogSize);
    } else if (event.key === 'ArrowLeft') {
        dogPosition.x = Math.max(dogPosition.x - step, 0);
    } else if (event.key === 'ArrowRight') {
        dogPosition.x = Math.min(dogPosition.x + step, gameArea.offsetWidth - dogSize);
    }

    // Vérifier la collision avec les murs ou les bordures
    if (checkCollision()) {
        dogPosition = initialPosition; // Annuler le déplacement si collision
        gameOver(); // Afficher "Game Over" et le score
        return;
    }

    updateDogPosition();
    checkCollisions();
});

// Chronomètre
function startTimer() {
    gameStarted = true;
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = `Temps restant: ${timer}s`;

        if (timer <= 0) {
            clearInterval(timerInterval);
            gameStarted = false;
            instructionsElement.innerHTML = `<span style="font-size: 3em; color: red;">Le jeu est terminé ! </span>`
        }
    }, 1000);
}

// Initialisation
function startGame() {
    instructionsElement.textContent = 'Déplacez le chien pour attraper le maximum d\'os !';
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    timer = 30;
    timerElement.textContent = `Temps restant: 30s`;

    // Supprimer les anciens os et murs
    bones.forEach(bone => bone.remove());
    walls.forEach(wall => wall.remove());
    bones.length = 0;
    walls.length = 0;

    createBones();
    createWalls();
    updateDogPosition();
    startTimer();
}

// Game Over
function gameOver() {
    clearInterval(timerInterval); // Arrêter le chronomètre
    gameStarted = false;
    instructionsElement.innerHTML = `<span style="font-size: 3em; color: red;">Game Over</span><br>Vous avez heurté un mur !`;
}

// Afficher les instructions initiales
instructionsElement.textContent = 'Appuyez sur la touche espace pour commencer';