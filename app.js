//Her kommer din Javascript-kode. Kommentarene er lagt til for å hjelpe deg med å dele opp oppgavene,
// du kan slette disse hvis du ønsker.
document.addEventListener("DOMContentLoaded", () => {
    const characterNameInput = document.getElementById("character-name");
    const characterHpInput = document.getElementById("character-hp");
    const characterAttackInput = document.getElementById("attack-damage");
    const profileImages = document.querySelectorAll(".profile-img");
    const createCharacterBtn = document.getElementById("create-character");
    const generateEnemyBtn = document.getElementById("generate-enemy");
    const enemyImg = document.getElementById("enemy-img");
    const enemyName = document.getElementById("enemy-name");
    const enemyHp  = document.getElementById("enemy-hp");
    const enemyAttack = document.getElementById("enemy-attack");
    const startFightBtn = document.getElementById("start-fight");
    const battleResult = document.getElementById("battle-result");
    const battleArea = document.getElementById("battle-area"); 

    // Del 1: Lag karakter og lagre karakteren i localStorage

    // Lagrer valgt profilbilde
    let selectedImage = ""; 

    // Definerer unike stats for hver karakterklasse
    const characterStats = {
        "mage.webp": { hp: 100, attack: 25 },
        "death-knight.jpeg": { hp: 100, attack: 30 },
        "hunter.jpg": { hp: 100, attack: 35 }
    };

    // Tillater brukeren å velge et profilbilde
    profileImages.forEach(img => {
        img.addEventListener("click", () => { 
            selectedImage = img.src;
            const imageName = img.src.split("/").pop(); 
            
            // Oppdater HP og attack basert på valgt klasse
            if (characterStats[imageName]) {
                characterHpInput.value = characterStats[imageName].hp;
                characterAttackInput.value = characterStats[imageName].attack;
            }

            profileImages.forEach(i => i.style.border = "3px solid #6a4e1e");
            img.style.border = "3px solid #ffd700";
        });
    });

    // Oppretter en karakter og lagrer i localStorage
    createCharacterBtn.addEventListener("click", () => {
        // Debugging
        console.log("Create Character button clicked!"); 

        const character = {
            name: characterNameInput.value.trim(), 
            hp: parseInt(characterHpInput.value) || 100, 
            attack: parseInt(characterAttackInput.value) || 20, 
            image: selectedImage 
        };

        // Sørger for at navn og profilbilde er valgt
        if (!character.name || !character.image) {
            alert("You must choose a name and profile picture");
            return;
        }

        // Lagrer karakteren i localStorage
        localStorage.setItem("character", JSON.stringify(character));
        alert("Character saved!");
    });

    // Seksjon 2: Generer fiende

    const enemyTypes = [
        { name: "Swamp Monster", img: "assets/swamp-monster.jpg" },
        { name: "Monster", img: "assets/monster.jpg" },
        { name: "Dragon", img: "assets/dragon.jpg" }
    ];

    // Genererer en tilfeldig fiende
    generateEnemyBtn.addEventListener("click", () => {
        // Debugging
        console.log("Generate Enemy button clicked!"); 

        const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        const enemy = {
            name: randomEnemy.name,
            hp: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
            attack: Math.floor(Math.random() * (40 - 10 + 1)) + 10,
            image: randomEnemy.img
        };

        // Lagrer fienden i localStorage og viser den
        localStorage.setItem("enemy", JSON.stringify(enemy));
        displayEnemy(enemy);
    });

    // Viser fienden på skjermen
    function displayEnemy(enemy) {
        enemyImg.src = enemy.image;
        enemyName.textContent = `Name: ${enemy.name}`;
        enemyHp.textContent = `HP: ${enemy.hp}`;
        enemyAttack.textContent = `Attack: ${enemy.attack}`;
    }

    // Seksjon 3: Sloss!

    // Starter en kamp mellom karakter og fiende
    startFightBtn.addEventListener("click", () => {
        // Debugging
        console.log("Fight button clicked!"); 

        const character = JSON.parse(localStorage.getItem("character"));
        const enemy = JSON.parse(localStorage.getItem("enemy"));

        // Sørger for at både karakter og fiende er valgt
        if (!character || !enemy) {
            alert("Both a character and an enemy must be selected!");
            return;
        }

        // Beregner kampresultat
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
         // Show battle details again
        displayBattle(character, enemy); 
        battleResult.textContent = resultText;
    });

    // Displays both the character and the enemy in battle 
    function displayBattle(character, enemy) {
        // Remove any existing battle displays
        document.getElementById("character-display")?.remove();
        document.getElementById("enemy-fight-display")?.remove();

        // Create the character's battle dispay
        const charDiv = document.createElement("div");
        charDiv.id = "character-display";
        charDiv.classList.add("profile-card");
        charDiv.innerHTML = `
            <h2>Hero</h2>
            <img src="${character.image}" alt="Profile card" />
            <p><strong>Name:</strong> ${character.name}</p>
            <p><strong>HP:</strong> ${character.hp}</p>
            <p><strong>Attack power:</strong> ${character.attack}</p>
        `;
        battleArea.appendChild(charDiv);

        // Create the enemy's battle display
        const enemyDiv = document.createElement("div");
        enemyDiv.id = "enemy-fight-display";
        enemyDiv.classList.add("profile-card");
        enemyDiv.innerHTML = `
            <h2>Enemy</h2>
            <img src="${enemy.image}" alt="Enemy profile card" />
            <p><strong>Name:</strong> ${enemy.name}</p>
            <p><strong>HP:</strong> ${enemy.hp}</p>
            <p><strong>Attack power:</strong> ${enemy.attack}</p>
        `;
        battleArea.appendChild(enemyDiv);
    }

    // Reloads Localdata when refreshing
    document.addEventListener("DOMContentLoaded", () => {
        const savedCharacter = JSON.parse(localStorage.getItem("character"));
        const savedEnemy = JSON.parse(localStorage.getItem("enemy"));

        if (savedEnemy) displayEnemy(savedEnemy);
    });
});
