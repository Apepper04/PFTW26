function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();
}

function draw() {
  background(25);

  let cols = 8;
  let rows = 8;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col * cellW + cellW / 2;
      let y = row * cellH + cellH / 2;

      // shift the hue based on position in the grid
      let hue = (row * cols + col) * (360 / (rows * cols));

      push();
      translate(x, y);

      // inner loop draws concentric rings inside each cell
      for (let i = 0; i < 12; i++) {
        let size = cellW - i * 7;
        if (size < 5) break;

        // rotate each ring a little more than the last
        rotate(i * 8 + row * 5 + col * 3);

        noFill();
        stroke(hue, 60, 85, 50);
        strokeWeight(1.5);
        ellipse(0, 0, size, size * 0.6);
      }

      // small bright dot at the center of each cell
      noStroke();
      fill(hue, 80, 95);
      circle(0, 0, 5);

      pop();
    }
  }
}