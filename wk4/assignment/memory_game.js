// Memory Game - Part 1: Grid Layout
// 16 cards (4x4 grid) = 8 matching pairs

const cardW = 120;
const cardH = 160;
const spacing = 20;
const gridCols = 4;
const gridRows = 4;

let offsetX = 80;
let offsetY = 140;
let cards = [];
let cardId = 0;

function setup() {
  createCanvas(680, 860);
  background('#1a1a2e');

  // title
  fill('#e0c097');
  textSize(32);
  textAlign(CENTER);
  text('Vinyl Matcher', width / 2, 50);

  // score placeholder
  textSize(16);
  fill('#8a8a9a');
  text('Score: 0', width / 2, 85);

  // build card grid
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let posX = offsetX + col * (cardW + spacing);
      let posY = offsetY + row * (cardH + spacing);

      cards.push({ x: posX, y: posY, id: cardId });
      drawCardBack(posX, posY);
      cardId++;
    }
  }

  console.log(cards);
}

function drawCardBack(cx, cy) {
  // card base
  fill('#16213e');
  stroke('#e0c097');
  strokeWeight(2);
  rect(cx, cy, cardW, cardH, 8);

  // vinyl record design on card back
  let centerX = cx + cardW / 2;
  let centerY = cy + cardH / 2;

  noStroke();
  fill('#0f3460');
  circle(centerX, centerY, 80);

  stroke('#e0c097');
  strokeWeight(0.5);
  noFill();
  circle(centerX, centerY, 70);
  circle(centerX, centerY, 55);
  circle(centerX, centerY, 40);

  // center label
  noStroke();
  fill('#e94560');
  circle(centerX, centerY, 22);
  fill('#1a1a2e');
  circle(centerX, centerY, 6);
}

function mousePressed() {
  for (let j = 0; j < cards.length; j++) {
    if (
      mouseX > cards[j].x &&
      mouseX < cards[j].x + cardW &&
      mouseY > cards[j].y &&
      mouseY < cards[j].y + cardH
    ) {
      console.log('Card clicked - id:', cards[j].id);
    }
  }
}