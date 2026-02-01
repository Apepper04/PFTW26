// Array of question objects
let questions = [
    {
        question: "How many strings does a standard guitar have?",
        answer: "6"
    },
    {
        question: "What family of instruments does the violin belong to?",
        answer: "strings"
    },
    {
        question: "How many keys does a standard piano have?",
        answer: "88"
    },
    {
        question: "What do you call the stick used to play a violin?",
        answer: "bow"
    },
    {
        question: "How many strings does a bass guitar typically have?",
        answer: "4"
    },
    {
        question: "What brass instrument has a slide?",
        answer: "trombone"
    },
    {
        question: "How many holes does a standard flute have?",
        answer: "16"
    },
    {
        question: "What instrument family does the saxophone belong to?",
        answer: "woodwind"
    },
    {
        question: "How many valves does a standard trumpet have?",
        answer: "3"
    },
    {
        question: "What do you press on a piano to sustain notes?",
        answer: "pedal"
    }
];

// Pick a random question
let randomIndex = Math.floor(Math.random() * questions.length);
let randomQuestion = questions[randomIndex];

// Prompt the user with the random question
let userAnswer = prompt(randomQuestion.question);

// Alert the user with their answer and the correct answer
alert("You answered " + userAnswer + ". The correct answer was " + randomQuestion.answer + ".");