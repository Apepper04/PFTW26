let numShapes;

function setup() {
  createCanvas(1000, 1000);
  numShapes = prompt("How many circles do you want?");
}

function draw() {
  background(220);
  
  for (let i = 0; i < numShapes; i++) {
    fill(random(255), random(255), random(255));
    circle(random(1000), random(1000), 50);
  }
  
  noLoop();
}