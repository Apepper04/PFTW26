let hasArms = prompt("Should the snowman have arms? (yes/no)", "yes");
let hasButtons = prompt("Should the snowman have buttons? (yes/no)", "yes");
let timeOfDay = prompt("Is it day or night?", "day");
let isSnowing = prompt("Is it snowing? (yes/no)", "yes");
let hasFamily = prompt("Does the snowman have a family? (yes/no)", "yes");

function setup() {
    createCanvas(1000, 800);
}

function draw() {
    // Sky (day or night)
    if (timeOfDay === "night") {
        background('#1f1f30');
    } else {
        background('#87CEEB');
    }
    
    // Ground/snow
    fill('#f1f1f1');
    noStroke();
    rect(0, 600, 1000, 200);
    
    // Trees (3 on left, 3 on right with trunks)
    // Left trunks (drawn first so trees overlap them)
    fill('#5c4033');
    noStroke();
    rect(40, 560, 20, 40);
    rect(110, 560, 20, 40);
    rect(190, 560, 20, 40);
    // Left trees
    fill('#2d5a27');
    triangle(50, 410, 20, 560, 80, 560);
    triangle(120, 380, 80, 560, 160, 560);
    triangle(200, 420, 160, 560, 240, 560);
    
    // Right trunks
    fill('#5c4033');
    rect(790, 560, 20, 40);
    rect(870, 560, 20, 40);
    rect(950, 560, 20, 40);
    // Right trees
    fill('#2d5a27');
    triangle(800, 420, 760, 560, 840, 560);
    triangle(880, 380, 840, 560, 920, 560);
    triangle(960, 410, 920, 560, 1000, 560);
    
    // Family snowmen (small, simple)
    if (hasFamily === "yes") {
        // Left child snowman
        fill('#f1f1f1');
        strokeWeight(6);
        stroke('#e4e4e4');
        ellipse(280, 570, 120);
        ellipse(280, 480, 80);
        ellipse(280, 410, 60);
        // Face
        stroke(0);
        strokeWeight(12);
        point(265, 405);
        point(295, 405);
        fill('#FF6600');
        stroke('#CC5500');
        strokeWeight(1);
        triangle(275, 412, 275, 422, 310, 417);
        fill('#000000');
        noStroke();
        ellipse(265, 426, 6);
        ellipse(280, 432, 6);
        ellipse(295, 426, 6);
        
        // Right child snowman
        fill('#f1f1f1');
        strokeWeight(6);
        stroke('#e4e4e4');
        ellipse(720, 570, 120);
        ellipse(720, 480, 80);
        ellipse(720, 410, 60);
        // Face
        stroke(0);
        strokeWeight(12);
        point(705, 405);
        point(735, 405);
        fill('#FF6600');
        stroke('#CC5500');
        strokeWeight(1);
        triangle(715, 412, 715, 422, 750, 417);
        fill('#000000');
        noStroke();
        ellipse(705, 426, 6);
        ellipse(720, 432, 6);
        ellipse(735, 426, 6);
    }
    
    // Arms (drawn before main body so they appear behind)
    if (hasArms === "yes") {
        stroke('#8B4513');
        strokeWeight(10);
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
    
    // Snowflakes
    if (isSnowing === "yes") {
        fill('#ffffff');
        noStroke();
        for (let i = 0; i < 50; i++) {
            ellipse(random(1000), random(600), 5);
        }
        noLoop();
    }
}