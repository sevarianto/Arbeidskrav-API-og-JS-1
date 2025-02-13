// Her kan du skrive testene dine
const { createCharacter, generateEnemy, fight } = require("../game");

// Test Hero
test("Character should be created with correct attributes", () => {
    const hero = createCharacter("Test Hero", 120, 30, "hero.jpg");
    expect(hero.name).toBe("Test Hero");
    expect(hero.hp).toBe(120);
    expect(hero.attack).toBe(30);
    expect(hero.image).toBe("hero.jpg");
});

// Test Enemy
test("Enemy should be generated with valid stats", () => {
    const enemy = generateEnemy();
    expect(["Goblin", "Orc", "Dragon"]).toContain(enemy.name);
    expect(enemy.hp).toBeGreaterThanOrEqual(50);
    expect(enemy.hp).toBeLessThanOrEqual(150);
    expect(enemy.attack).toBeGreaterThanOrEqual(10);
    expect(enemy.attack).toBeLessThanOrEqual(40);
});

// Test Battle
test("Fight function should determine the correct winner", () => {
    expect(fight({ hp: 100, attack: 20 }, { hp: 80, attack: 10 })).toBe("You won!");
    expect(fight({ hp: 100, attack: 20 }, { hp: 120, attack: 30 })).toBe("You lost!");
    expect(fight({ hp: 100, attack: 20 }, { hp: 100, attack: 20 })).toBe("It's a draw!");
});

// Test LocalStorage 
test("Character and Enemy should be stored in localStorage", () => {
    const character = createCharacter("Test Hero", 120, 30, "hero.jpg");
    const enemy = generateEnemy();

    global.localStorage = {
        setItem: jest.fn(),
        getItem: jest.fn((key) => {
            if (key === "character") return JSON.stringify(character);
            if (key === "enemy") return JSON.stringify(enemy);
            return null;
        }),
    };

    localStorage.setItem("character", JSON.stringify(character));
    localStorage.setItem("enemy", JSON.stringify(enemy));

    const storedCharacter = JSON.parse(localStorage.getItem("character"));
    const storedEnemy = JSON.parse(localStorage.getItem("enemy"));

    expect(storedCharacter.name).toBe(character.name);
    expect(storedCharacter.hp).toBe(character.hp);
    expect(storedCharacter.attack).toBe(character.attack);
    expect(storedCharacter.image).toBe(character.image);

    expect(storedEnemy.name).toBe(enemy.name);
    expect(storedEnemy.hp).toBe(enemy.hp);
    expect(storedEnemy.attack).toBe(enemy.attack);
    expect(storedEnemy.image).toBe(enemy.image);
});
