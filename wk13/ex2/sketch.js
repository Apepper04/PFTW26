class Firefly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(4, 8);
    this.glowSpeed = random(0.008, 0.018);
    this.driftSpeedX = random(0.004, 0.01);
    this.driftSpeedY = random(0.005, 0.012);
    this.driftRangeX = random(30, 80);
    this.driftRangeY = random(20, 50);
    this.offset = random(0, TWO_PI);
  }

  update() {
    this.currentX = this.x + sin(frameCount * this.driftSpeedX + this.offset) * this.driftRangeX;
    this.currentY = this.y + sin(frameCount * this.driftSpeedY + this.offset + 2) * this.driftRangeY;
    this.glow = max(0, sin(frameCount * this.glowSpeed + this.offset));
  }

  display() {
    let alpha = this.glow * 200;
    let glowSize = this.size + this.glow * 25;

    noStroke();

    fill(255, 220, 80, alpha * 0.15);
    ellipse(this.currentX, this.currentY, glowSize * 3, glowSize * 3);

    fill(255, 230, 100, alpha * 0.3);
    ellipse(this.currentX, this.currentY, glowSize * 1.8, glowSize * 1.8);

    fill(255, 240, 130, alpha * 0.6);
    ellipse(this.currentX, this.currentY, glowSize, glowSize);

    fill(255, 250, 180, alpha);
    ellipse(this.currentX, this.currentY, this.size, this.size);
  }
}

let fireflies = [];
let stars = [];

function setup() {
  createCanvas(600, 500);

  for (let i = 0; i < 20; i++) {
    fireflies.push(new Firefly(random(50, 550), random(50, 400)));
  }

  for (let i = 0; i < 60; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.4),
      size: random(1, 2.5),
      speed: random(0.01, 0.025),
      offset: random(TWO_PI)
    });
  }
}

function draw() {
  background(10, 15, 30);

  drawStars();
  drawGround();

  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update();
    fireflies[i].display();
  }
}

function drawStars() {
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    let twinkle = 80 + sin(frameCount * s.speed + s.offset) * 60;
    fill(255, 255, 240, twinkle);
    ellipse(s.x, s.y, s.size, s.size);
  }
}

function drawGround() {
  noStroke();

  fill(8, 20, 10);
  rect(0, height * 0.82, width, height * 0.18);

  fill(12, 30, 15);
  beginShape();
  for (let x = 0; x <= width; x += 20) {
    let hillY = height * 0.82 + sin(x * 0.01 + 1) * 15 - 10;
    vertex(x, hillY);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  for (let i = 0; i < 12; i++) {
    let gx = i * 55 + 15;
    let gy = height * 0.82 + sin(gx * 0.01 + 1) * 15 - 12;
    drawGrassBlade(gx, gy);
  }
}

function drawGrassBlade(x, y) {
  let sway = sin(frameCount * 0.01 + x * 0.1) * 8;
  stroke(20, 50, 25);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(x, y);
  quadraticVertex(x + sway, y - 25, x + sway * 1.5, y - 45);
  endShape();

  beginShape();
  vertex(x + 4, y);
  quadraticVertex(x + 4 + sway * 0.8, y - 20, x + sway + 6, y - 35);
  endShape();
}