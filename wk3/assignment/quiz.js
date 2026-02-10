// quiz questions carried over from assignment 2
let questions = [
    { question: "How many strings does a standard guitar have?", answer: ["6", "six"] },
    { question: "What family of instruments does the violin belong to?", answer: ["strings", "string"] },
    { question: "How many keys does a standard piano have?", answer: ["88", "eighty eight", "eighty-eight"] },
    { question: "What do you call the stick used to play a violin?", answer: ["bow", "bows"] },
    { question: "How many strings does a bass guitar typically have?", answer: ["4", "four"] },
    { question: "What brass instrument has a slide?", answer: ["trombone", "trombones"] },
    { question: "How many holes does a standard flute have?", answer: ["16", "sixteen"] },
    { question: "What instrument family does the saxophone belong to?", answer: ["woodwind", "woodwinds"] },
    { question: "How many valves does a standard trumpet have?", answer: ["3", "three"] },
    { question: "What do you press on a piano to sustain notes?", answer: ["pedal", "pedals"] }
];

// keep a copy so we can reset
let originalQuestions = questions.slice();

// tracking variables
let currentQuestion;
let feedbackText = "";
let feedbackColor = "green";
let rightCount = 0;
let wrongCount = 0;
let maxRight = 5;
let maxWrong = 5;
let gameOver = false;

// p5 dom elements
let answerInput;
let submitButton;
let resetButton;

// get a random question from the remaining array
function getNextQuestion() {
    if (questions.length < 1) {
        return null;
    }
    let randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

// check the user's answer
function checkAnswer() {
    // don't do anything if game is over
    if (gameOver) {
        return;
    }
    // don't do anything if there's no current question
    if (!currentQuestion) {
        return;
    }
    // make sure the user typed something
    if (answerInput.value().trim() === "") {
        feedbackText = "Please type an answer first!";
        feedbackColor = "orange";
        return;
    }

    // compare answers (case insensitive, check against all accepted answers)
    let userAnswer = answerInput.value().trim().toLowerCase();
    let isCorrect = currentQuestion.answer.indexOf(userAnswer) !== -1;

    if (isCorrect) {
        // remove the correctly answered question
        questions = questions.filter(function(q) {
            return q !== currentQuestion;
        });
        rightCount = rightCount + 1;
        feedbackText = "Correct!";
        feedbackColor = "green";

        // check if 5 correct answers
        if (rightCount >= maxRight) {
            feedbackText = "5 correct answers! You win!";
            gameOver = true;
            answerInput.attribute("disabled", "");
            submitButton.attribute("disabled", "");
            return;
        }

        // move to next question
        currentQuestion = getNextQuestion();
    } else {
        // wrong answer - remove it from the pool
        questions = questions.filter(function(q) {
            return q !== currentQuestion;
        });
        wrongCount = wrongCount + 1;
        feedbackText = "Not quite. Try again!";
        feedbackColor = "red";

        // check if too many wrong
        if (wrongCount >= maxWrong) {
            feedbackText = "Too many wrong answers. You lost! Hit reset to try again.";
            gameOver = true;
            answerInput.attribute("disabled", "");
            submitButton.attribute("disabled", "");
            return;
        }

        // get a new question even on wrong answer
        currentQuestion = getNextQuestion();
    }

    // clear the input
    answerInput.value("");
}

// reset everything back to the start
function resetQuiz() {
    questions = originalQuestions.slice();
    rightCount = 0;
    wrongCount = 0;
    feedbackText = "";
    feedbackColor = "green";
    gameOver = false;
    answerInput.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    currentQuestion = getNextQuestion();
    answerInput.value("");
}

// start the first question
currentQuestion = getNextQuestion();

function setup() {
    createCanvas(700, 500);

    // text input for the answer
    answerInput = createInput("");
    answerInput.size(250, 24);
    answerInput.position(50, 200);

    // submit button
    submitButton = createButton("Submit Answer");
    submitButton.size(150, 30);
    submitButton.position(50, 240);
    submitButton.mousePressed(checkAnswer);

    // reset button
    resetButton = createButton("Reset Quiz");
    resetButton.size(100, 30);
    resetButton.position(550, 30);
    resetButton.mousePressed(resetQuiz);
}

function draw() {
    background(30, 30, 50);

    // title
    fill(255);
    textSize(28);
    text("Music Trivia", 50, 60);

    // show correct count
    fill(100, 255, 100);
    textSize(16);
    text("Correct: " + rightCount + " / " + maxRight, 50, 90);

    // show wrong count
    fill(255, 100, 100);
    text("Wrong: " + wrongCount + " / " + maxWrong, 50, 115);

    // show the current question
    if (currentQuestion && !gameOver) {
        fill(255);
        textSize(20);
        text(currentQuestion.question, 50, 170);
    }

    // show feedback
    fill(feedbackColor);
    textSize(18);
    text(feedbackText, 50, 310);
}