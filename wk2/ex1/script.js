// Create an array with 5 favorite movie titles
let movies = [
    "A Knight's Tale",
    "Scott Pilgrim vs. the World",
    "Thor: Ragnarok",
    "Garden State",
    "Star Wars"
];

// Prompt the user to enter their favorite movie
let userMovie = prompt("What is your favorite movie?");

// Add the movie to the array using push
movies.push(userMovie);

// Display full list of movies with toString() method
console.log("Our favorite movies: " + movies.toString());