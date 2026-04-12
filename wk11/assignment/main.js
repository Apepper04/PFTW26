// Sketch 1: Grid of squares that rotate and scale based on distance from center
let sketch1 = function(p) {
  p.setup = function() {
    p.createCanvas(700, 700);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.noLoop();
  };

  p.draw = function() {
    p.background(30, 28, 45);

    let cols = 14;
    let rows = 14;
    let cellW = p.width / cols;
    let cellH = p.height / rows;
    let centerX = p.width / 2;
    let centerY = p.height / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = col * cellW + cellW / 2;
        let y = row * cellH + cellH / 2;

        // distance from canvas center drives the transformation
        let d = p.dist(x, y, centerX, centerY);
        let maxDist = p.dist(0, 0, centerX, centerY);
        let t = d / maxDist;

        p.push();
        p.translate(x, y);
        p.rotate(t * 120);
        p.scale(0.3 + t * 0.7);

        p.noFill();
        p.stroke(200, 170, 130, 60 + t * 150);
        p.strokeWeight(1);
        p.rect(0, 0, cellW * 0.7, cellH * 0.7);

        p.stroke(160, 130, 100, 40 + t * 80);
        p.rect(0, 0, cellW * 0.35, cellH * 0.35);

        p.pop();
      }
    }
  };
};

// Sketch 2: Triangles that progressively rotate, scale, and fade along a grid
let sketch2 = function(p) {
  p.setup = function() {
    p.createCanvas(700, 700);
    p.angleMode(p.DEGREES);
    p.noLoop();
  };

  p.draw = function() {
    p.background(30, 28, 45);

    let cols = 10;
    let rows = 10;
    let cellW = p.width / cols;
    let cellH = p.height / rows;
    let total = cols * rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = col * cellW + cellW / 2;
        let y = row * cellH + cellH / 2;

        // index from top-left to bottom-right drives the transformation
        let index = row * cols + col;
        let t = index / total;

        p.push();
        p.translate(x, y);
        p.rotate(t * 270);
        p.scale(0.4 + t * 0.8);

        let alpha = 40 + t * 180;
        let size = cellW * 0.4;

        p.noFill();
        p.stroke(200, 170, 130, alpha);
        p.strokeWeight(1);
        p.triangle(0, -size, -size * 0.8, size * 0.6, size * 0.8, size * 0.6);

        p.stroke(160, 130, 100, alpha * 0.5);
        p.triangle(0, -size * 0.5, -size * 0.4, size * 0.3, size * 0.4, size * 0.3);

        p.pop();
      }
    }
  };
};

// Sketch 3: Circles that translate outward and scale down in a spiral
let sketch3 = function(p) {
  p.setup = function() {
    p.createCanvas(700, 700);
    p.angleMode(p.DEGREES);
    p.noLoop();
  };

  p.draw = function() {
    p.background(30, 28, 45);
    p.translate(p.width / 2, p.height / 2);

    let totalRings = 20;

    for (let ring = 0; ring < totalRings; ring++) {
      let count = 6 + ring * 3;
      let radius = 20 + ring * 16;
      let size = p.map(ring, 0, totalRings, 30, 8);

      for (let i = 0; i < count; i++) {
        let angle = i * (360 / count) + ring * 15;

        p.push();
        p.rotate(angle);
        p.translate(radius, 0);

        // scale down as rings move outward
        let s = p.map(ring, 0, totalRings, 1.2, 0.4);
        p.scale(s);

        p.noFill();
        p.stroke(200, 170, 130, 50 + ring * 8);
        p.strokeWeight(1);
        p.circle(0, 0, size);

        // smaller inner circle
        p.stroke(160, 130, 100, 30 + ring * 5);
        p.circle(0, 0, size * 0.4);

        p.pop();
      }
    }
  };
};

new p5(sketch1, "sketch1");
new p5(sketch2, "sketch2");
new p5(sketch3, "sketch3");