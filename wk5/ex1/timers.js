let blockX = 0;
let blockY = 0;
let blockColor;
let drawTimer;
const speed = 12;
const distance = 2;

function setup() {
    createCanvas(500, 500);
    background(20);
    colorMode(HSB, 360, 100, 100);
    blockColor = color(190, 70, 90);

    window.setTimeout(() => {
        drawTimer = window.setInterval(() => {
            if (blockY - 50 <= height) {
                drawBlock(blockX, blockY, blockColor);
                blockY += distance;
            } else {
                blockY = 0;
                blockX += 50;
            }
            if (blockY - 50 > height && blockX - 50 > width) {
                window.clearInterval(drawTimer);
                alert('All done!');
            }
        }, speed);
    }, 1000);
}

function drawBlock(x, y, clr) {
    noStroke();
    fill(clr || color(190, 70, 90));
    rect(x, y, 50, 50);
}

function keyTyped() {
    let keyToNumber = Number(key);
    if (isNaN(keyToNumber)) {
        return;
    }
    let hueValue = map(keyToNumber, 0, 9, 0, 360);
    blockColor = color(hueValue, 65, 95);
}