// Create an array with favorite games as objects
let games = [
    {
        title: "The Legend of Zelda: Breath of the Wild",
        type: "action-adventure",
        numberOfPlayers: 1,
        rating: 10,
        shortDescription: "An open-world adventure where you explore Hyrule and defeat Calamity Ganon."
    },
    {
        title: "Mario Kart 8 Deluxe",
        type: "racing",
        numberOfPlayers: 4,
        rating: 9,
        shortDescription: "A fun kart racing game with iconic Nintendo characters."
    },
    {
        title: "Stardew Valley",
        type: "simulation",
        numberOfPlayers: 4,
        rating: 9,
        shortDescription: "A relaxing farming game where you build your dream farm and befriend villagers."
    }
];

// Prompt the user to pick a game
let userChoice = prompt("I have " + games.length + " games in my collection. Pick a number between 1 and " + games.length + " and I'll tell you about that game.");

// Cast the prompt to a number
userChoice = Number(userChoice);

// Alert the user about the selected game
alert("You selected " + games[userChoice - 1].title + " which is a " + games[userChoice - 1].type + " game. It supports " + games[userChoice - 1].numberOfPlayers + " player(s) and I give it a " + games[userChoice - 1].rating + "/10. " + games[userChoice - 1].shortDescription);