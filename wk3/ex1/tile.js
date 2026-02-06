function setup() {
    createCanvas(200, 200);
}

function createTile() {
    translate(0, 0);
    
    // Background square
    noStroke();
    fill('#2C3E50');
    rect(0, 0, 200, 200);
    
    // Diagonal lines creating diamond pattern
    stroke('#E74C3C');
    strokeWeight(8);
    line(0, 0, 100, 100);
    line(100, 100, 200, 0);
    line(0, 200, 100, 100);
    line(100, 100, 200, 200);
    
    // Corner circles
    fill('#F39C12');
    noStroke();
    circle(0, 0, 60);
    circle(200, 0, 60);
    circle(0, 200, 60);
    circle(200, 200, 60);
    
    // Center diamond shape
    fill('#3498DB');
    stroke('#ECF0F1');
    strokeWeight(3);
    quad(100, 60, 140, 100, 100, 140, 60, 100);
    
    // Small accent circles
    fill('#E67E22');
    noStroke();
    circle(50, 50, 25);
    circle(150, 50, 25);
    circle(50, 150, 25);
    circle(150, 150, 25);
    
    // Decorative arc patterns
    noFill();
    stroke('#1ABC9C');
    strokeWeight(4);
    arc(100, 0, 80, 80, 0, PI);
    arc(0, 100, 80, 80, -HALF_PI, HALF_PI);
    arc(200, 100, 80, 80, HALF_PI, PI + HALF_PI);
    arc(100, 200, 80, 80, PI, TWO_PI);
}

function draw() {
    createTile();
    noLoop();
}