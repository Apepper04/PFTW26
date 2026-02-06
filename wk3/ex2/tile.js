function setup() {
    createCanvas(600, 600);
}

function createTile(originX, originY, bgColor, primaryColor, secondaryColor, accentColor, rotationAngle) {
    push();
    translate(originX, originY);
    
    // Rotate around the center of the tile
    translate(100, 100);
    rotate(rotationAngle);
    translate(-100, -100);
    
    // Background square
    noStroke();
    fill(bgColor);
    rect(0, 0, 200, 200);
    
    // Diagonal lines creating diamond pattern
    stroke(primaryColor);
    strokeWeight(8);
    line(0, 0, 100, 100);
    line(100, 100, 200, 0);
    line(0, 200, 100, 100);
    line(100, 100, 200, 200);
    
    // Corner circles
    fill(secondaryColor);
    noStroke();
    circle(0, 0, 60);
    circle(200, 0, 60);
    circle(0, 200, 60);
    circle(200, 200, 60);
    
    // Center diamond shape
    fill(primaryColor);
    stroke(accentColor);
    strokeWeight(3);
    quad(100, 60, 140, 100, 100, 140, 60, 100);
    
    // Small accent circles
    fill(accentColor);
    noStroke();
    circle(50, 50, 25);
    circle(150, 50, 25);
    circle(50, 150, 25);
    circle(150, 150, 25);
    
    // Decorative arc patterns
    noFill();
    stroke(secondaryColor);
    strokeWeight(4);
    arc(100, 0, 80, 80, 0, PI);
    arc(0, 100, 80, 80, -HALF_PI, HALF_PI);
    arc(200, 100, 80, 80, HALF_PI, PI + HALF_PI);
    arc(100, 200, 80, 80, PI, TWO_PI);
    
    pop();
}

function draw() {
    // Using nested loops to fill the 3x3 grid
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let posX = x * 200;
            let posY = y * 200;
            
            // Create different color schemes and rotations for variation
            if ((x + y) % 2 === 0) {
                createTile(posX, posY, '#2C3E50', '#E74C3C', '#F39C12', '#3498DB', 0);
            } else if ((x + y) % 3 === 0) {
                createTile(posX, posY, '#16A085', '#E67E22', '#9B59B6', '#F1C40F', HALF_PI);
            } else {
                createTile(posX, posY, '#34495E', '#1ABC9C', '#E74C3C', '#F39C12', PI);
            }
        }
    }
    
    noLoop();
}