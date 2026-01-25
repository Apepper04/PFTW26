let hasArms = prompt("Should the snowman have arms? (yes/no)", "yes");
let hasButtons = prompt("Should the snowman have buttons? (yes/no)", "yes");

function setup() {
    createCanvas(1000, 800);
}

function draw() {
    background('#87CEEB');
    
    // Ground/snow
    fill('#f1f1f1');
    noStroke();
    rect(0, 600, 1000, 200);
    
    // Arms (drawn first so they appear behind the body)
    if (hasArms === "yes") {
        stroke('#8B4513');
        strokeWeight(8);
        // Left arm
        line(375, 350, 280, 280);
        // Right arm
        line(625, 350, 720, 280);
    }
    
    // Circle 1: Base
    fill('#f1f1f1');
    strokeWeight(10);
    stroke('#e4e4e4');
    ellipse(500, 550, 350);
    
    // Circle 2: Body
    ellipse(500, 350, 250);
    
    // Circle 3: Head
    ellipse(500, 175, 175);
    
    // Hat brim
    stroke('#444444');
    quad(415, 100, 585, 100, 585, 105, 415, 105);
    
    // Hat body
    fill('#444444');
    quad(450, 30, 550, 30, 550, 100, 450, 100);
    
    // Eyes
    stroke(0);
    strokeWeight(30);
    point(450, 160);
    point(550, 160);
    
    // Carrot nose
    fill('#FF6600');
    stroke('#CC5500');
    strokeWeight(2);
    triangle(490, 180, 490, 210, 570, 195);
    
    // Mouth (coal pieces)
    fill('#000000');
    noStroke();
    ellipse(445, 215, 12);
    ellipse(470, 230, 12);
    ellipse(500, 235, 12);
    ellipse(530, 230, 12);
    ellipse(555, 215, 12);
    
    // Buttons
    if (hasButtons === "yes") {
        fill('#000000');
        noStroke();
        ellipse(500, 310, 15);
        ellipse(500, 360, 15);
        ellipse(500, 410, 15);
    }
}