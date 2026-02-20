// array to hold all bubble instances
let bubbles = [];

function setup() {
    createCanvas(500, 500);
    // create 8 bubble instances with a for loop
    for (let i = 0; i < 8; i++) {
        bubbles.push(new Bubble(random(width), random(height), random(30, 80)));
    }
}

function draw() {
    background(15, 15, 35);
    // loop through each bubble to move and display it
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].show();
    }
}

// Bubble class definition
class Bubble {
    constructor(x, y, size) {
        // class properties for position and size
        this.x = x;
        this.y = y;
        this.size = size;
        // each bubble gets a unique hue
        this.hue = random(150, 220);
    }

    // method that gives the bubble random drifting movement
    move() {
        this.x += random(-3, 3);
        this.y += random(-3, 3);
    }

    // method that renders the bubble using class properties
    show() {
        stroke(this.hue, 200, 240, 160);
        strokeWeight(2);
        fill(this.hue, 180, 220, 40);
        ellipse(this.x, this.y, this.size);
    }
}