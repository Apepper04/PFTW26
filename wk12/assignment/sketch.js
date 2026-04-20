let strings = [];
let numStrings = 6;
let oscillators = [];
let envelopes = [];
let currentChord = null;
let audioStarted = false;
let isMinor = false;

let majorChords = {
  a: [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
  b: [123.47, 185.00, 246.94, 311.13, 369.99, 493.88],
  c: [130.81, 164.81, 196.00, 261.63, 329.63, 523.25],
  d: [146.83, 220.00, 293.66, 369.99, 440.00, 587.33],
  e: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63],
  f: [87.31, 130.81, 174.61, 220.00, 261.63, 349.23],
  g: [98.00, 123.47, 196.00, 246.94, 293.66, 392.00]
};

let minorChords = {
  a: [110.00, 164.81, 220.00, 261.63, 329.63, 440.00],
  b: [123.47, 185.00, 246.94, 293.66, 369.99, 493.88],
  c: [130.81, 155.56, 196.00, 261.63, 311.13, 523.25],
  d: [146.83, 220.00, 293.66, 349.23, 440.00, 587.33],
  e: [82.41, 123.47, 164.81, 196.00, 246.94, 329.63],
  f: [87.31, 130.81, 174.61, 207.65, 261.63, 349.23],
  g: [98.00, 116.54, 196.00, 233.08, 293.66, 392.00]
};

let openStrings = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];

let chordColors = {
  a: [255, 100, 100],
  b: [255, 170, 80],
  c: [255, 255, 100],
  d: [100, 255, 150],
  e: [100, 200, 255],
  f: [180, 130, 255],
  g: [255, 130, 220]
};

function setup() {
  createCanvas(700, 580);

  for (let i = 0; i < numStrings; i++) {
    let osc = new p5.Oscillator("triangle");
    osc.amp(0);
    osc.start();
    oscillators.push(osc);

    let env = new p5.Envelope();
    env.setADSR(0.01, 0.15, 0.2, 0.5);
    env.setRange(0.3, 0);
    envelopes.push(env);
  }

  let centerY = height / 2 + 20;
  let spacing = 40;
  let totalHeight = spacing * (numStrings - 1);
  let topY = centerY - totalHeight / 2;

  for (let i = 0; i < numStrings; i++) {
    let y = topY + i * spacing;
    strings.push({
      x1: 60,
      y1: y - 12,
      x2: width - 60,
      y2: y + 12,
      vibration: 0,
      wasHovering: false
    });
  }
}

function draw() {
  if (!audioStarted) {
    background(30, 30, 30);
    fill(200);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Click anywhere to start", width / 2, height / 2);
    return;
  }

  isMinor = keyIsDown(SHIFT);

  if (currentChord && chordColors[currentChord]) {
    let c = chordColors[currentChord];
    let tintAmount = isMinor ? 0.05 : 0.08;
    background(lerpColor(color(30, 30, 30), color(c[0], c[1], c[2]), tintAmount));
  } else {
    background(30, 30, 30);
  }

  fill(200);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text("String Thing", width / 2, 16);

  textSize(11);
  fill(140);
  text("A digital guitar. Click a string to pluck it, or hold one of the", width / 2, 44);
  text("letter keys shown below (A, B, C, D, E, F, or G) and drag your mouse across", width / 2, 58);
  text("the strings to strum a chord. Hold Shift + a letter key to play a minor chord.", width / 2, 72);


  textSize(18);
  if (currentChord) {
    let c = chordColors[currentChord];
    fill(c[0], c[1], c[2]);
    let label = currentChord.toUpperCase();
    if (isMinor) {
      label += "m";
    }
    text(label, width / 2, 96);
  } else {
    fill(80);
    textSize(14);
    text("Open", width / 2, 98);
  }

  for (let i = 0; i < numStrings; i++) {
    let s = strings[i];
    let isHovering = isMouseNearString(s, 12);

    if (isHovering && !s.wasHovering && currentChord) {
      pluckString(i);
      s.vibration = 1.0;
    }
    s.wasHovering = isHovering;

    s.vibration *= 0.95;

    drawString(s, i, isHovering);
  }

  let keyLabels = ["A", "B", "C", "D", "E", "F", "G"];
  let keySpacing = 70;
  let startX = width / 2 - (keyLabels.length - 1) * keySpacing / 2;
  let keyY = height - 50;

  for (let i = 0; i < keyLabels.length; i++) {
    let x = startX + i * keySpacing;
    let k = keyLabels[i].toLowerCase();
    let isActive = currentChord === k;

    if (isActive) {
      let c = chordColors[k];
      stroke(c[0], c[1], c[2]);
    } else {
      stroke(70);
    }

    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(x, keyY, 40, 30, 6);

    noStroke();
    if (isActive) {
      let c = chordColors[k];
      fill(c[0], c[1], c[2]);
    } else {
      fill(90);
    }
    textAlign(CENTER, CENTER);
    textSize(14);
    let label = keyLabels[i];
    if (isActive && isMinor) {
      label += "m";
    }
    text(label, x, keyY);
  }
}

function drawString(s, index, isHovering) {
  let baseWeight = map(index, 0, numStrings - 1, 4, 1.5);

  let baseColor;
  if (currentChord && chordColors[currentChord]) {
    let c = chordColors[currentChord];
    baseColor = color(c[0], c[1], c[2]);
  } else {
    baseColor = color(180, 170, 150);
  }

  if (isHovering) {
    baseColor = currentChord ? color(255) : color(220, 210, 190);
  }

  let segments = 40;
  strokeWeight(baseWeight);
  stroke(baseColor);
  noFill();

  beginShape();
  for (let j = 0; j <= segments; j++) {
    let t = j / segments;
    let x = lerp(s.x1, s.x2, t);
    let y = lerp(s.y1, s.y2, t);

    if (s.vibration > 0.01) {
      let distFromCenter = sin(t * PI);
      let wave = sin(t * 30 + frameCount * 0.5) * s.vibration * 8 * distFromCenter;
      y += wave;
    }

    vertex(x, y);
  }
  endShape();

  if (s.vibration > 0.05) {
    strokeWeight(baseWeight + 4);
    let glowAlpha = s.vibration * 80;
    if (currentChord && chordColors[currentChord]) {
      let c = chordColors[currentChord];
      stroke(c[0], c[1], c[2], glowAlpha);
    } else {
      stroke(255, 255, 200, glowAlpha);
    }
    noFill();
    beginShape();
    for (let j = 0; j <= segments; j++) {
      let t = j / segments;
      let x = lerp(s.x1, s.x2, t);
      let y = lerp(s.y1, s.y2, t);
      if (s.vibration > 0.01) {
        let distFromCenter = sin(t * PI);
        let wave = sin(t * 30 + frameCount * 0.5) * s.vibration * 8 * distFromCenter;
        y += wave;
      }
      vertex(x, y);
    }
    endShape();
  }
}

function isMouseNearString(s, threshold) {
  let dx = s.x2 - s.x1;
  let dy = s.y2 - s.y1;
  let len = sqrt(dx * dx + dy * dy);
  let t = ((mouseX - s.x1) * dx + (mouseY - s.y1) * dy) / (len * len);
  t = constrain(t, 0, 1);
  let closestX = s.x1 + t * dx;
  let closestY = s.y1 + t * dy;
  let distance = dist(mouseX, mouseY, closestX, closestY);
  return distance < threshold;
}

function pluckString(index) {
  let freqs;
  if (currentChord) {
    if (isMinor) {
      freqs = minorChords[currentChord];
    } else {
      freqs = majorChords[currentChord];
    }
  } else {
    freqs = openStrings;
  }
  oscillators[index].freq(freqs[index]);
  envelopes[index].play(oscillators[index]);
}

function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    audioStarted = true;
    return;
  }

  for (let i = 0; i < numStrings; i++) {
    if (isMouseNearString(strings[i], 12)) {
      pluckString(i);
      strings[i].vibration = 1.0;
      break;
    }
  }
}

function keyPressed() {
  let k = key.toLowerCase();
  if (majorChords[k]) {
    currentChord = k;
  }
}

function keyReleased() {
  let k = key.toLowerCase();
  if (currentChord === k) {
    currentChord = null;
  }
}