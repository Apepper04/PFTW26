// Shape properties
let circleX = 0;
const circleSize = 70;
let circleY;
let speed;

// Score tracking
let clickCount = 0;

function setup() {
    createCanvas(500, 500);
    circleY = random(circleSize, height - circleSize);
    speed = random(1.5, 3.5);
}

function draw() {
    background('#2b2d42');

    // Instructions text
    fill('#edf2f4');
    noStroke();
    textSize(16);
    text('Click the circle before it escapes!', 130, 30);

    drawShape();

    // Move the circle across the screen
    circleX += speed;

    // Check if the circle has left the canvas
    if (circleX > width + circleSize) {
        noLoop();
        textSize(28);
        fill('#edf2f4');
        textAlign(CENTER);
        text('Game over! You clicked ' + clickCount + ' times.', width / 2, height / 2);
    }
}

function mousePressed() {
    // Check if the mouse click is inside the circle
    let d = dist(mouseX, mouseY, circleX, circleY);
    if (d < circleSize / 2) {
        clickCount++;
        console.log('Hit!', clickCount);
    }
}

function drawShape() {
    fill('#ef233c');
    noStroke();
    ellipse(circleX, circleY, circleSize, circleSize);
}