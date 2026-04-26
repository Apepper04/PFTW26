// Aurora curtain class - each instance is one band of light
class AuroraCurtain {
  constructor(baseY, speed, colorType) {
    this.baseY = baseY;
    this.speed = speed;
    this.colorType = colorType;
    this.offset = random(TWO_PI);
    this.waveScale = random(0.005, 0.012);
    this.amplitude = random(30, 60);
    this.height = random(80, 150);
  }

  display() {
    noStroke();
    // Draw vertical strips across the canvas to form the curtain
    for (let x = 0; x < width; x += 3) {
      // sin() drives the wave motion of the curtain
      let wave = sin(x * this.waveScale + frameCount * this.speed + this.offset) * this.amplitude;
      // Shimmer effect for brightness variation along the curtain
      let shimmer = sin(x * 0.02 + frameCount * 0.03 + this.offset) * 0.3 + 0.7;
      let topY = this.baseY + wave;

      // Three color types: green, blue-teal, purple
      let r, g, b;
      if (this.colorType === 0) {
        r = 20;
        g = 180 + sin(x * 0.01 + frameCount * 0.01) * 40;
        b = 80;
      } else if (this.colorType === 1) {
        r = 40;
        g = 140 + sin(x * 0.015 + frameCount * 0.008) * 30;
        b = 160 + sin(x * 0.01 + frameCount * 0.012) * 40;
      } else {
        r = 100 + sin(x * 0.01 + frameCount * 0.01) * 40;
        g = 60;
        b = 160 + sin(x * 0.012 + frameCount * 0.009) * 30;
      }

      // Draw each strip fading from top to bottom
      for (let i = 0; i < this.height; i += 4) {
        let fade = map(i, 0, this.height, 35, 0) * shimmer;
        fill(r, g, b, fade);
        rect(x, topY + i, 3, 4);
      }
    }
  }
}

let curtains = [];
let stars = [];

function setup() {
  createCanvas(700, 500);

  // Create five aurora curtains with different speeds and colors
  curtains.push(new AuroraCurtain(80, 0.003, 0));
  curtains.push(new AuroraCurtain(110, 0.007, 1));
  curtains.push(new AuroraCurtain(60, 0.002, 2));
  curtains.push(new AuroraCurtain(140, 0.006, 0));
  curtains.push(new AuroraCurtain(100, 0.001, 1));

  // Generate random star positions
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.6),
      size: random(1, 2.5),
      twinkleSpeed: random(0.01, 0.03),
      offset: random(TWO_PI)
    });
  }
}

function draw() {
  background(8, 10, 25);

  drawStars();

  // Draw each aurora curtain
  for (let i = 0; i < curtains.length; i++) {
    curtains[i].display();
  }

  drawGround();
}

// Stars twinkle using sin() to oscillate brightness
function drawStars() {
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    let brightness = 150 + sin(frameCount * s.twinkleSpeed + s.offset) * 80;
    fill(255, 255, 240, brightness);
    ellipse(s.x, s.y, s.size, s.size);
  }
}

// Layered hills and flat ground at the bottom
function drawGround() {
  noStroke();

  // Back hill layer
  fill(15, 18, 12);
  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let hillY = height * 0.78 + sin(x * 0.008) * 20 + sin(x * 0.02) * 8;
    vertex(x, hillY);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Front hill layer
  fill(10, 12, 8);
  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let hillY = height * 0.85 + sin(x * 0.012 + 2) * 15;
    vertex(x, hillY);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Flat ground
  fill(5, 8, 5);
  rect(0, height * 0.92, width, height * 0.08);

  drawTrees();
}

// Simple tree silhouettes along the back hill line
function drawTrees() {
  fill(8, 12, 8);
  noStroke();
  let treePositions = [50, 120, 200, 310, 400, 480, 560, 630];
  for (let i = 0; i < treePositions.length; i++) {
    let tx = treePositions[i];
    let treeHeight = random(40, 70);
    let baseY = height * 0.78 + sin(tx * 0.008) * 20 + sin(tx * 0.02) * 8;
    triangle(tx, baseY - treeHeight, tx - 12, baseY, tx + 12, baseY);
    triangle(tx, baseY - treeHeight - 15, tx - 9, baseY - treeHeight + 20, tx + 9, baseY - treeHeight + 20);
  }
}