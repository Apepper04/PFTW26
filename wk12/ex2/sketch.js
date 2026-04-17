let sounds = [];
let labels = ["horse", "duck", "pig", "chicken", "sheep", "cow"];
let emojis = ["\uD83D\uDC0E", "\uD83E\uDD86", "\uD83D\uDC37", "\uD83D\uDC14", "\uD83D\uDC11", "\uD83D\uDC2E"];
let colors = [];
let cols = 3;
let rows = 2;
let tileW, tileH;
let headerH = 70;
let activeIndex = -1;

function preload() {
  for (let i = 0; i < labels.length; i++) {
    sounds.push(loadSound("sounds/" + labels[i] + ".mp3"));
  }
}

function setup() {
  createCanvas(600, 470);
  tileW = width / cols;
  tileH = (height - headerH) / rows;

  colors = [
    color(231, 76, 60),
    color(46, 204, 113),
    color(52, 152, 219),
    color(241, 196, 15),
    color(155, 89, 182),
    color(230, 126, 34)
  ];
}

function draw() {
  background(34, 49, 34);

  // heading
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Farm Sounds", width / 2, headerH / 2);

  for (let i = 0; i < labels.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = col * tileW;
    let y = row * tileH + headerH;

    // brighten the tile if it was just clicked
    if (i === activeIndex) {
      fill(lerpColor(colors[i], color(255), 0.4));
    } else {
      fill(colors[i]);
    }

    noStroke();
    rect(x + 5, y + 5, tileW - 10, tileH - 10, 12);

    // emoji
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text(emojis[i], x + tileW / 2, y + tileH / 2 - 15);

    // label
    textSize(18);
    text(labels[i], x + tileW / 2, y + tileH / 2 + 25);
  }
}

function mousePressed() {
  let col = floor(mouseX / tileW);
  let row = floor((mouseY - headerH) / tileH);
  let index = row * cols + col;

  if (mouseY > headerH && index >= 0 && index < sounds.length) {
    // stop any sound that is currently playing
    for (let i = 0; i < sounds.length; i++) {
      if (sounds[i].isPlaying()) {
        sounds[i].stop();
      }
    }

    sounds[index].play();
    activeIndex = index;

    // reset the highlight after a short delay
    setTimeout(function () {
      activeIndex = -1;
    }, 300);
  }
}