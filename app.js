//Her kommer din Javascript-kode. Kommentarene er lagt til for å hjelpe deg med å dele opp oppgavene,
// du kan slette disse hvis du ønsker.
const characterNameInput = document.getElementById("character-name")
const characterHpInput = document.getElementById("character-hp")
const characterAttackInput = document.getElementById("attack-damage")
const profileImages = document.querySelectorAll(".profile-img")
const createCharacterBtn = document.getElementById("create-character")
const generateEnemyBtn = document.getElementById("generate-enemy")
const enemyDisplay = document.getElementById("enemy-display")
const enemyImg = document.getElementById("enemy-img")
const enemyName = document.getElementById("enemy-name")
const enemyHp  = document.getElementById("enemy-hp")
const enemyAttack = document.getElementById("enemy-attack")
const startFightBtn = document.getElementById("start-fight")
const battleResult = document.getElementById("battle-result")

// Del 1: Lag karakter og lagre karakteren i localStorage

// Stores the selected profile image
let selectedImage = ""; 

// Allow the user to choose a profile picture
profileImages.forEach(img => {
    img.addEventListener("click", () => { 
        // Update the selected image
        selectedImage = img.src;
        console.log("Selected Image:", selectedImage); // Debugging: Log selected image to console

        // Reset the border for all images
        profileImages.forEach(i => i.style.border = "3px solid #6a4e1e");

        // Highlight the selected image
        img.style.border = "3px solid #ffd700";
    });
});

//  Ensure "Make character" button only gets one event listener
createCharacterBtn.addEventListener("click", () => {
    // Create a character object with input values
    const character = {
        name: characterNameInput.value.trim(), // Get and trim the character name
        hp: parseInt(characterHpInput.value) || 100, // Default HP is 100 if input is empty
        attack: parseInt(characterAttackInput.value) || 20, // Default attack is 20 if input is empty
        image: selectedImage // Store the selected profile image
    };

    //  Validation: Ensure a name and profile picture are selected
    if (!character.name || !character.image) {
        alert("You must choose a name and profile picture");
        return;
    }

    //  Save the character to localStorage
    localStorage.setItem("character", JSON.stringify(character));
    alert("Character saved!"); // Confirm to the user
});

//Seksjon 2: Generer fiende

const enemyTypes = [
    { name: "Swamp Monster", img: "assets/swamp-monster.jpg" },
    { name: "Monster", img: "assets/monster.jpg" },
    { name: "Dragon", img: "assets/dragon.jpg" }
];

generateEnemyBtn.addEventListener("click", () => {
    const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemy = {
        name: randomEnemy.name,
        hp: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
        attack: Math.floor(Math.random() * (40 - 10 + 1)) + 10,
        image: randomEnemy.img
    };

    localStorage.setItem("enemy", JSON.stringify(enemy));
    displayEnemy(enemy);
});

function displayEnemy(enemy) {
    enemyImg.src = enemy.image;
    enemyName.textContent = `Name: ${enemy.name}`;
    enemyHp.textContent = `HP: ${enemy.hp}`;
    enemyAttack.textContent = `Attack: ${enemy.attack}`;
}

// Seksjon 3: Sloss!

startFightBtn.addEventListener("click", () => {
    const character = JSON.parse(localStorage.getItem("character"));
    const enemy = JSON.parse(localStorage.getItem("enemy"));

    if (!character || !enemy) {
        alert("Both a character and an enemy must be selected!");
        return;
    }

    const finalCharacterHp = character.hp - enemy.attack;
    const finalEnemyHp = enemy.hp - character.attack;

    let resultText = "";
    if (finalCharacterHp > finalEnemyHp) {
        resultText = "You won!";
    } else if (finalEnemyHp > finalCharacterHp) {
        resultText = "You lost!";
    } else {
        resultText = "It's a draw!";
    }

    displayBattle(character, enemy);
    battleResult.textContent = resultText;
});

// Shows the character and enemy in the arena
function displayBattle(character, enemy) {
    const battleArea = document.getElementById("battle-area");

    document.getElementById("character-display")?.remove();
    document.getElementById("enemy-fight-display")?.remove();

    const charDiv = document.createElement("div");
    charDiv.id = "character-display";
    charDiv.classList.add("profile-card");
    charDiv.innerHTML = `
        <h2>Hero</h2>
        <img src="${character.image}" alt="Profile picture" />
        <p>${character.name}</p>
        <p>HP: ${character.hp}</p>
        <p>Attack: ${character.attack}</p>
    `;
    battleArea.appendChild(charDiv);

    const enemyDiv = document.createElement("div");
    enemyDiv.id = "enemy-fight-display";
    enemyDiv.classList.add("profile-card");
    enemyDiv.innerHTML = `
        <h2>Enemy</h2>
        <img src="${enemy.image}" alt="Enemy profile picture" />
        <p>${enemy.name}</p>
        <p>HP: ${enemy.hp}</p>
        <p>Attack: ${enemy.attack}</p>
    `;
    battleArea.appendChild(enemyDiv);
}
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.

// Reload data when refresh
document.addEventListener("DOMContentLoaded", () => {
    const savedCharacter = JSON.parse(localStorage.getItem("character"));
    const savedEnemy = JSON.parse(localStorage.getItem("enemy"));

    if (savedEnemy) displayEnemy(savedEnemy);
});