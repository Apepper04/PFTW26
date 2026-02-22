// Vinyl Matcher - Memory Game
// Match pairs of album covers to win

// card and layout settings
const DOWN = 'down';
const UP = 'up';
const cardSize = 120;
const gap = 16;
const gridCols = 4;
const gridRows = 4;
const marginX = 60;
const marginY = 130;

// game data
let cards = [];
let cardfaceArray = [];
let cardbackImg;

// game state tracks flipped cards, matches, attempts, and pause between flips
const gameState = {
  totalPairs: 8,
  flippedCards: [],
  numMatched: 0,
  attempts: 0,
  waiting: false
};

// load all album cover images and the card back before setup runs
function preload() {
  cardfaceArray = [
    loadImage('images/blink182-enemaofthestate.png'),
    loadImage('images/deathcab-plans.png'),
    loadImage('images/greenday-dookie.png'),
    loadImage('images/mychem-blackparade.png'),
    loadImage('images/pixies-doolittle.png'),
    loadImage('images/spoon-gimmefiction.png'),
    loadImage('images/theformat-interventionandlullabies.png'),
    loadImage('images/voxtrot-voxtrot.png')
  ];
}

function setup() {
  createCanvas(620, 740);

  // build a paired and shuffled array of face images
  let selectedFaces = [];
  for (let i = 0; i < cardfaceArray.length; i++) {
    selectedFaces.push(cardfaceArray[i]);
    selectedFaces.push(cardfaceArray[i]);
  }
  selectedFaces = shuffleArray(selectedFaces);

  // create the 4x4 grid of Card objects
  let startX = marginX;
  let startY = marginY;
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let posX = startX + col * (cardSize + gap);
      let posY = startY + row * (cardSize + gap);
      let faceImg = selectedFaces.pop();
      cards.push(new Card(posX, posY, faceImg));
    }
  }
}

function draw() {
  background('#1a1a2e');

  // title
  fill('#e0c097');
  noStroke();
  textFont('Georgia');
  textSize(36);
  textAlign(CENTER);
  text('Vinyl Matcher', width / 2, 45);

  // score and attempts display
  textSize(16);
  textAlign(LEFT);
  fill('#8a8a9a');
  text('Matches: ' + gameState.numMatched + ' / ' + gameState.totalPairs, marginX, 80);
  textAlign(RIGHT);
  text('Attempts: ' + gameState.attempts, width - marginX, 80);

  // check for win before drawing cards
  if (gameState.numMatched === gameState.totalPairs) {
    // draw all matched cards one last time
    for (let i = 0; i < cards.length; i++) {
      cards[i].show();
    }
    // victory message
    fill('#e94560');
    textAlign(CENTER);
    textSize(30);
    text('You matched them all!', width / 2, 108);
    noLoop();
    return;
  }

  // flip unmatched cards back down, then draw all cards
  for (let i = 0; i < cards.length; i++) {
    if (!cards[i].isMatch) {
      cards[i].face = DOWN;
    }
    cards[i].show();
  }

  // reset flipped cards after drawing
  noLoop();
  gameState.flippedCards.length = 0;
  gameState.waiting = false;
}

// handle card clicks and matching logic
function mousePressed() {
  // ignore clicks while waiting for unmatched cards to flip back
  if (gameState.waiting) {
    return;
  }

  for (let i = 0; i < cards.length; i++) {
    // only allow flipping if fewer than 2 cards are face up
    if (gameState.flippedCards.length < 2 && cards[i].didHit(mouseX, mouseY)) {
      gameState.flippedCards.push(cards[i]);
    }
  }

  // when two cards are flipped, check for a match
  if (gameState.flippedCards.length === 2) {
    gameState.attempts++;

    if (gameState.flippedCards[0].faceImg === gameState.flippedCards[1].faceImg) {
      // match found - mark both cards and update score
      gameState.flippedCards[0].isMatch = true;
      gameState.flippedCards[1].isMatch = true;
      gameState.flippedCards.length = 0;
      gameState.numMatched++;
      loop();
    } else {
      // no match - pause briefly so player can see both faces, then flip back
      gameState.waiting = true;
      const flipDelay = window.setTimeout(() => {
        loop();
        window.clearTimeout(flipDelay);
      }, 1000);
    }
  }
}

// Card class handles display, click detection, and flipping
class Card {
  constructor(x, y, faceImg) {
    this.x = x;
    this.y = y;
    this.size = cardSize;
    this.face = DOWN;
    this.faceImg = faceImg;
    this.isMatch = false;
    this.show();
  }

  // draw the card as either face up (album art) or face down (vinyl design)
  show() {
    if (this.face === UP || this.isMatch) {
      // face up - show album cover
      stroke('#e0c097');
      strokeWeight(2);
      fill('#222');
      rect(this.x, this.y, this.size, this.size, 4);
      image(this.faceImg, this.x + 2, this.y + 2, this.size - 4, this.size - 4);
    } else {
      // face down - draw vinyl record card back
      stroke('#e0c097');
      strokeWeight(2);
      fill('#16213e');
      rect(this.x, this.y, this.size, this.size, 4);

      let cx = this.x + this.size / 2;
      let cy = this.y + this.size / 2;

      // record disc
      noStroke();
      fill('#0f3460');
      circle(cx, cy, 80);

      // grooves
      stroke('#e0c097');
      strokeWeight(0.5);
      noFill();
      circle(cx, cy, 70);
      circle(cx, cy, 55);
      circle(cx, cy, 40);

      // center label and spindle
      noStroke();
      fill('#e94560');
      circle(cx, cy, 22);
      fill('#1a1a2e');
      circle(cx, cy, 6);
    }
  }

  // check if a mouse click landed on this card
  didHit(mx, my) {
    if (mx >= this.x && mx <= this.x + this.size &&
        my >= this.y && my <= this.y + this.size) {
      this.flip();
      return true;
    } else {
      return false;
    }
  }

  // toggle card between face up and face down
  flip() {
    if (this.face === DOWN) {
      this.face = UP;
    } else {
      this.face = DOWN;
    }
    this.show();
  }
}

// randomly reorder an array using Fisher-Yates shuffle
function shuffleArray(array) {
  let counter = array.length;
  while (counter > 0) {
    const idx = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[idx];
    array[idx] = temp;
  }
  return array;
}