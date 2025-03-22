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

// Créer des murs (labyrinthe)
function createWalls() {
    const wall1 = document.createElement('div');
    wall1.classList.add('wall');
    wall1.style.width = '200px';
    wall1.style.height = '20px';
    wall1.style.top = '100px';
    wall1.style.left = '100px';
    gameArea.appendChild(wall1);

    const wall2 = document.createElement('div');
    wall2.classList.add('wall');
    wall2.style.width = '20px';
    wall2.style.height = '200px';
    wall2.style.top = '200px';
    wall2.style.left = '300px';
    gameArea.appendChild(wall2);

    walls.push(wall1, wall2);
}

// Vérifier si le chien touche un mur
function checkWallCollision() {
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
        // Commencer le jeu dès qu'une touche de direction est appuyée
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            startGame();
        }
    }

    if (!gameStarted) return; // Ne pas bouger tant que le jeu n'est pas commencé

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

    // Vérifier la collision avec les murs
    if (checkWallCollision()) {
        dogPosition = initialPosition; // Annuler le déplacement si collision
        instructionsElement.textContent = 'Le chien est mort ! Vous avez heurté un mur.';
        gameStarted = false; // Arrêter le jeu si collision
        return;
    }

    updateDogPosition();
    checkCollisions();
});

// Chronomètre
function startTimer() {
    gameStarted = true;
    const interval = setInterval(() => {
        timer--;
        timerElement.textContent = `Temps restant: ${timer}s`;

        if (timer <= 0) {
            clearInterval(interval);
            gameStarted = false;
            instructionsElement.textContent = `Le jeu est terminé ! Vous avez attrapé ${score} os.`;
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
    createBones();
    createWalls();
    updateDogPosition();
    startTimer();
}
