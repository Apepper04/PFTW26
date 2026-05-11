// Background image of the exhibit
let exhibitImg;

// Array of all clickable instruments and signs
let instruments = [];

// Tracks which instrument popup is currently open (null = none)
let selectedInstrument = null;

// Whether audio has been unlocked by a user click
let audioStarted = false;

// Variables for scaling the image to fit the browser window
let scaleFactor = 1;
let offsetX = 0;
let offsetY = 0;

// Index of the instrument currently being hovered (-1 = none)
let hoverIndex = -1;

// Whether the mouse is over the popup close button
let closeButtonHover = false;

// Space reserved for the header text above the image
let headerHeight = 70;

// Original dimensions of the exhibit photo
let ORIG_W = 2000;
let ORIG_H = 1125;

// Load all images and audio before the sketch starts
function preload() {
  exhibitImg = loadImage("images/EmergingTechnologyExhibit.jpg");

  // Each instrument has a name, year, description, clickable area (x, y, w, h),
  // an image file for the popup, and an audio file for playback
  instruments = [
    {
      name: "RCA Theremin",
      year: "1929",
      description: "One of the earliest electronic instruments ever made. Invented by Leon Theremin and manufactured by RCA in 1929, this instrument is played without physical contact. The performer moves their hands near two antennas to control pitch and volume, creating an eerie, wavering tone that became iconic in science fiction film scores and avant-garde music.",
      x: 210, y: 459, w: 313, h: 468,
      imgFile: "images/RCATheremin.png",
      audioFile: "audio/RCATheremin.mp3",
      img: null, sound: null
    },
    {
      name: "Hammond Novachord",
      year: "1939",
      description: "Often considered the world's first commercial polyphonic synthesizer. Built by the Hammond Organ Company in 1939, the Novachord used 163 vacuum tubes to produce its sounds and could play up to 72 notes simultaneously. Fewer than 1,100 were ever made, and it was used extensively in Hollywood film scores throughout the 1940s and 1950s.",
      x: 529, y: 386, w: 309, h: 181,
      imgFile: "images/HammondNovachord.png",
      audioFile: "audio/HammondNovachord.mp3",
      img: null, sound: null
    },
    {
      name: "Moog Theremin",
      year: "1954",
      description: "Robert Moog began his career in electronic music by building theremins as a teenager in the 1950s. His company continued producing high-quality theremins alongside their famous synthesizers. This modern Moog Etherwave features the same fundamental technology as the 1920s original but with updated electronics, offering precise pitch and volume control through its two antennas.",
      x: 584, y: 571, w: 266, h: 341,
      imgFile: "images/MoogTheremin.png",
      audioFile: "audio/MoogTheremin.mp3",
      img: null, sound: null
    },
    {
      name: "ARP 2600",
      year: "1971",
      description: "A semi-modular analog synthesizer produced by ARP Instruments from 1971 to 1981. Unlike fully modular systems, the 2600 came pre-wired so it could produce sound right out of the box, while still offering patch points for custom signal routing. It became a favorite in studios and universities, and its distinctive voice was used to create the sound of R2-D2 in Star Wars.",
      x: 870, y: 157, w: 280, h: 270,
      imgFile: "images/ARP2600.png",
      audioFile: "audio/ARP2600.mp3",
      img: null, sound: null
    },
    {
      name: "Minimoog Model D",
      year: "1970",
      description: "The synthesizer that changed everything. Released in 1970 by Moog Music, the Model D was the first portable, affordable synthesizer designed for live performance. Its three oscillators, iconic ladder filter, and warm analog sound made it the gold standard for bass and lead synthesizer tones. It has appeared on countless recordings across every genre of popular music.",
      x: 929, y: 476, w: 233, h: 93,
      imgFile: "images/MinimoogModelD.png",
      audioFile: "audio/MinimoogModelD.mp3",
      img: null, sound: null
    },
    {
      name: "Korg Vocoder",
      year: "1978",
      description: "The Korg VC-10 Vocoder, released in 1978, combined a synthesizer with a vocoder processor and a built-in gooseneck microphone. Vocoders analyze the frequency content of one sound (usually a voice) and impose it onto another (a synthesizer tone), creating the classic 'talking robot' effect heard in countless electronic and pop recordings from the late 1970s and 1980s.",
      x: 1154, y: 388, w: 165, h: 88,
      imgFile: "images/KorgVocoder.png",
      audioFile: "audio/KorgVocoder.mp3",
      img: null, sound: null
    },
    {
      name: "Linn Drum",
      year: "1982",
      description: "The LinnDrum, released in 1982 by Linn Electronics, was one of the first drum machines to use digitally recorded samples of real drums. Its crisp, punchy sounds defined the rhythm of 1980s pop, new wave, and R&B. Artists from Prince to Peter Gabriel to Depeche Mode relied on its instantly recognizable hi-hats, snares, and toms to drive their biggest hits.",
      x: 1154, y: 254, w: 173, h: 104,
      imgFile: "images/LinnDrum.png",
      audioFile: "audio/LinnDrum.mp3",
      img: null, sound: null
    },
    {
      name: "Roland D-50",
      year: "1987",
      description: "Released in 1987, the Roland D-50 introduced Linear Arithmetic synthesis, which combined short sampled attack transients with traditional subtractive synthesis. This approach produced strikingly realistic and complex sounds that were impossible on previous digital synths. Its built-in digital reverb and chorus effects gave it a lush, polished quality that dominated late 1980s pop and film scores.",
      x: 1333, y: 171, w: 317, h: 126,
      imgFile: "images/RolandD-50.png",
      audioFile: "audio/RolandD-50.mp3",
      img: null, sound: null
    },
    {
      name: "E-mu Emulator II",
      year: "1984",
      description: "The Emulator II, released in 1984 by E-mu Systems, was a groundbreaking digital sampler that let musicians record any sound and play it back across a keyboard. At around $8,000, it brought sampling technology to a wider audience beyond the ultra-expensive Fairlight CMI. Its 8-bit character gave sampled sounds a warm, gritty texture that remains sought after today.",
      x: 1333, y: 299, w: 313, h: 150,
      imgFile: "images/E-muEmulatorII.png",
      audioFile: "audio/E-muEmulatorII.mp3",
      img: null, sound: null
    },
    {
      name: "Oberheim OB-1",
      year: "1978",
      description: "The Oberheim OB-1, released in 1978, was one of the first programmable monophonic synthesizers. Players could store and recall up to eight patches using its built-in memory, a feature that was revolutionary at the time. Its two voltage-controlled oscillators and versatile modulation options produced thick, aggressive lead and bass tones favored in progressive rock and early electronic music.",
      x: 998, y: 577, w: 272, h: 65,
      imgFile: "images/OberheimOB-1.png",
      audioFile: "audio/OberheimOB-1.mp3",
      img: null, sound: null
    },
    {
      name: "Sequential Prophet-5",
      year: "1978",
      description: "The Sequential Prophet-5, introduced in 1978 by Dave Smith, was the first fully programmable polyphonic synthesizer. With five voices of polyphony and the ability to store 40 patches in memory, it freed keyboardists from having to manually recreate sounds before every performance. Its rich, warm analog sound has made it one of the most revered synthesizers in history.",
      x: 1274, y: 526, w: 335, h: 65,
      imgFile: "images/SequentialProphet5.png",
      audioFile: "audio/SequentialProphet5.mp3",
      img: null, sound: null
    },
    {
      name: "Yamaha DX7",
      year: "1983",
      description: "The Yamaha DX7, released in 1983, was the first massively successful digital synthesizer. Using FM (frequency modulation) synthesis, it produced bright, bell-like tones, glassy electric pianos, and punchy basses that became the defining sound of 1980s pop music. Over 200,000 units were sold, making it one of the best-selling synthesizers of all time.",
      x: 1337, y: 598, w: 416, h: 65,
      imgFile: "images/YamahaDX7.png",
      audioFile: "audio/YamahaDX7.mp3",
      img: null, sound: null
    },
    // Easter egg: the humidity sign in the top-left corner
    {
      name: "Humidity Control System",
      year: "",
      description: "These humidifiers help protect our instruments by maintaining stable humidity levels, preserving their quality and longevity.",
      x: 222, y: 116, w: 104, h: 69,
      imgFile: null,
      audioFile: null,
      img: null, sound: null
    },
    // Easter egg: the Emerging Technology sign on the right wall
    {
      name: "Emerging Technology",
      year: "",
      description: "The 20th and 21st centuries have seen unprecedented advances in technology, enabled by key innovations in electronics. With each of these innovations, enterprising musicians and inventors have explored the ever-expanding possibilities of making sound with electric and electronic tools. The instruments displayed here represent some of the ways that makers harnessed emerging technologies to let musicians work with nearly any sound imaginable.",
      x: 1822, y: 254, w: 177, h: 321,
      imgFile: null,
      audioFile: null,
      img: null, sound: null
    }
  ];

  // Load each instrument's image and audio file
  for (let i = 0; i < instruments.length; i++) {
    if (instruments[i].imgFile) {
      instruments[i].img = loadImage(instruments[i].imgFile);
    }
    if (instruments[i].audioFile) {
      // Three callbacks (success, error, loading) prevent failed loads from blocking preload
      instruments[i].sound = loadSound(
        instruments[i].audioFile,
        function() {},
        function() {},
        function() {}
      );
    }
  }
}

function setup() {
  calculateScale();
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display", "block");
  textFont("Georgia");
  imageMode(CORNER);
  cursor(ARROW);
}

// Figure out how to scale the exhibit image to fit the browser window
function calculateScale() {
  let availH = windowHeight - headerHeight;
  let scaleX = windowWidth / ORIG_W;
  let scaleY = availH / ORIG_H;
  scaleFactor = min(scaleX, scaleY);
  offsetX = (windowWidth - ORIG_W * scaleFactor) / 2;
  offsetY = headerHeight + (availH - ORIG_H * scaleFactor) / 2;
}

// Recalculate scaling when the browser window is resized
function windowResized() {
  calculateScale();
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(63, 80, 98);

  drawHeader();

  // Draw the exhibit photo, scaled and centered below the header
  push();
  translate(offsetX, offsetY);
  scale(scaleFactor);
  image(exhibitImg, 0, 0, ORIG_W, ORIG_H);
  drawHotspots();
  pop();

  // Draw the popup on top of everything if one is open
  if (selectedInstrument !== null) {
    drawPopup();
  }
}

// Title and instructions above the exhibit image
function drawHeader() {
  fill(63, 80, 98);
  noStroke();
  rect(0, 0, windowWidth, headerHeight);

  fill(244, 185, 54);
  textAlign(CENTER, CENTER);
  textSize(22);
  text("Emerging Technology Exhibit", windowWidth / 2, headerHeight / 2 - 10);

  fill(255, 255, 255, 180);
  textSize(12);
  text("Museum of Making Music  |  Click on any instrument to explore", windowWidth / 2, headerHeight / 2 + 14);
}

// Draw hover effects when the mouse is over a clickable instrument
function drawHotspots() {
  // Convert mouse position to original image coordinates
  let mx = (mouseX - offsetX) / scaleFactor;
  let my = (mouseY - offsetY) / scaleFactor;

  hoverIndex = -1;

  for (let i = 0; i < instruments.length; i++) {
    let inst = instruments[i];

    // Check if mouse is inside this instrument's clickable area
    let isHover = mx > inst.x && mx < inst.x + inst.w &&
                  my > inst.y && my < inst.y + inst.h;

    if (isHover && selectedInstrument === null) {
      hoverIndex = i;

      // Gold border around the instrument
      noFill();
      stroke(244, 185, 54, 200);
      strokeWeight(2.5);
      rect(inst.x, inst.y, inst.w, inst.h, 4);

      // Name label tooltip above the instrument
      fill(63, 80, 98, 220);
      noStroke();
      textSize(14);
      let labelW = textWidth(inst.name) + 20;
      let labelH = 28;
      let labelX = inst.x + inst.w / 2 - labelW / 2;
      let labelY = inst.y - 35;

      // If the label would go off the top, show it below instead
      if (labelY < 5) {
        labelY = inst.y + inst.h + 8;
      }

      rect(labelX, labelY, labelW, labelH, 4);
      fill(255);
      textAlign(CENTER, CENTER);
      text(inst.name, inst.x + inst.w / 2, labelY + labelH / 2);
    }
  }
}

// Draw the instrument detail popup
function drawPopup() {
  let inst = instruments[selectedInstrument];
  let hasImage = inst.img !== null;
  let hasAudio = inst.sound !== null && inst.sound.isLoaded();

  // Dark overlay behind the popup
  fill(0, 0, 0, 170);
  noStroke();
  rect(0, 0, windowWidth, windowHeight);

  // Popup background
  let popW = min(700, windowWidth - 60);
  let popH = min(620, windowHeight - 60);
  let popX = windowWidth / 2 - popW / 2;
  let popY = windowHeight / 2 - popH / 2;

  fill(63, 80, 98);
  stroke(244, 185, 54, 80);
  strokeWeight(1.5);
  rect(popX, popY, popW, popH, 10);

  // Close button (X) in the top-right corner
  let closeSize = 32;
  let closeX = popX + popW - closeSize - 12;
  let closeY = popY + 12;

  let cmx = mouseX;
  let cmy = mouseY;
  closeButtonHover = cmx > closeX && cmx < closeX + closeSize &&
                     cmy > closeY && cmy < closeY + closeSize;

  fill(closeButtonHover ? 244 : 150, closeButtonHover ? 185 : 150, closeButtonHover ? 54 : 150);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  text("\u2715", closeX + closeSize / 2, closeY + closeSize / 2);

  // Content area starts below the top padding
  let contentX = popX + 30;
  let contentY = popY + 30;
  let contentW = popW - 60;

  // Instrument name
  fill(244, 185, 54);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(26);
  text(inst.name, contentX, contentY);
  contentY += 36;

  // Year (if it has one)
  if (inst.year !== "") {
    fill(91, 109, 128);
    textSize(15);
    text(inst.year, contentX, contentY);
    contentY += 28;
  }

  // Divider line
  fill(91, 109, 128, 100);
  noStroke();
  rect(contentX, contentY, contentW, 1);
  contentY += 16;

  // Instrument image on a light background
  if (hasImage) {
    let imgMaxW = contentW;
    let imgMaxH = 240;
    let aspect = inst.img.width / inst.img.height;
    let drawW, drawH;

    // Scale the image to fit within the max dimensions
    if (aspect > imgMaxW / imgMaxH) {
      drawW = imgMaxW;
      drawH = imgMaxW / aspect;
    } else {
      drawH = imgMaxH;
      drawW = imgMaxH * aspect;
    }

    let imgX = contentX + contentW / 2 - drawW / 2;
    let imgY = contentY;
    let padX = 10;
    let padY = 10;

    // Light background behind the image
    fill(240);
    noStroke();
    rect(imgX - padX, imgY - padY, drawW + padX * 2, drawH + padY * 2, 6);

    image(inst.img, imgX, imgY, drawW, drawH);
    contentY += drawH + padY + 20;
  }

  // Description text
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  textLeading(22);
  text(inst.description, contentX, contentY, contentW, popY + popH - contentY - 70);

  // Play/stop audio button
  if (hasAudio) {
    let btnW = 160;
    let btnH = 38;
    let btnX = popX + popW / 2 - btnW / 2;
    let btnY = popY + popH - 55;

    let isPlaying = inst.sound.isPlaying();

    let btnHover = mouseX > btnX && mouseX < btnX + btnW &&
                   mouseY > btnY && mouseY < btnY + btnH;

    // Red when playing, teal when stopped
    if (isPlaying) {
      fill(180, 60, 50);
      if (btnHover) fill(200, 70, 55);
    } else {
      fill(3, 166, 156);
      if (btnHover) fill(4, 190, 178);
    }

    noStroke();
    rect(btnX, btnY, btnW, btnH, 6);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    let label = isPlaying ? "\u25A0  Stop Audio" : "\u25B6  Play Audio";
    text(label, btnX + btnW / 2, btnY + btnH / 2);
  }
}

function mousePressed() {
  // Unlock audio on the first user click (required by browsers)
  if (!audioStarted) {
    userStartAudio();
    audioStarted = true;
  }

  // If a popup is open, handle clicks inside it
  if (selectedInstrument !== null) {
    let inst = instruments[selectedInstrument];
    let hasAudio = inst.sound !== null && inst.sound.isLoaded();

    let popW = min(700, windowWidth - 60);
    let popH = min(620, windowHeight - 60);
    let popX = windowWidth / 2 - popW / 2;
    let popY = windowHeight / 2 - popH / 2;

    // Check if close button was clicked
    let closeSize = 32;
    let closeX = popX + popW - closeSize - 12;
    let closeY = popY + 12;

    if (mouseX > closeX && mouseX < closeX + closeSize &&
        mouseY > closeY && mouseY < closeY + closeSize) {
      closePopup();
      return;
    }

    // Check if audio button was clicked
    if (hasAudio) {
      let btnW = 160;
      let btnH = 38;
      let btnX = popX + popW / 2 - btnW / 2;
      let btnY = popY + popH - 55;

      if (mouseX > btnX && mouseX < btnX + btnW &&
          mouseY > btnY && mouseY < btnY + btnH) {
        if (inst.sound.isPlaying()) {
          inst.sound.stop();
        } else {
          stopAllAudio();
          inst.sound.play();
        }
        return;
      }
    }

    // Clicking outside the popup closes it
    if (mouseX < popX || mouseX > popX + popW ||
        mouseY < popY || mouseY > popY + popH) {
      closePopup();
      return;
    }

    return;
  }

  // No popup open: check if an instrument was clicked
  let mx = (mouseX - offsetX) / scaleFactor;
  let my = (mouseY - offsetY) / scaleFactor;

  for (let i = 0; i < instruments.length; i++) {
    let inst = instruments[i];
    if (mx > inst.x && mx < inst.x + inst.w &&
        my > inst.y && my < inst.y + inst.h) {
      selectedInstrument = i;
      return;
    }
  }
}

// Close the popup and stop any playing audio
function closePopup() {
  stopAllAudio();
  selectedInstrument = null;
}

// Stop all instrument audio clips
function stopAllAudio() {
  for (let i = 0; i < instruments.length; i++) {
    if (instruments[i].sound && instruments[i].sound.isPlaying()) {
      instruments[i].sound.stop();
    }
  }
}

// Switch cursor to hand pointer when hovering over clickable areas
function mouseMoved() {
  if (selectedInstrument !== null) {
    cursor(closeButtonHover ? HAND : ARROW);
    return;
  }

  if (hoverIndex >= 0) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

// Press Escape to close the popup
function keyPressed() {
  if (key === "Escape" && selectedInstrument !== null) {
    closePopup();
  }
}