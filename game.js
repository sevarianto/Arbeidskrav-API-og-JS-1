// game.js - Handles game logic (separate from UI) Jest test data

// Create a character object
function createCharacter(name, hp, attack, image) {
    return { name, hp, attack, image };
}

// Generate a random enemy
function generateEnemy() {
    const enemies = [
        { name: "Goblin", img: "assets/goblin.jpg" },
        { name: "Orc", img: "assets/ork.jpg" },
        { name: "Dragon", img: "assets/dragon.jpg" }
    ];

    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    return {
        name: randomEnemy.name,
        hp: Math.floor(Math.random() * (150 - 50 + 1)) + 50, // Random HP (50-150)
        attack: Math.floor(Math.random() * (40 - 10 + 1)) + 10, // Random Attack (10-40)
        image: randomEnemy.img
    };
}

// Fight logic - Determines winner
function fight(character, enemy) {
    if (!character || !enemy) return "Error: Missing data!";
    
    const finalCharacterHp = character.hp - enemy.attack;
    const finalEnemyHp = enemy.hp - character.attack;

    if (finalCharacterHp > finalEnemyHp) return "You won!";
    if (finalEnemyHp > finalCharacterHp) return "You lost!";
    return "It's a draw!";
}

// Export functions for Jest testing
module.exports = { createCharacter, generateEnemy, fight };
