let layer1, layer2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  smooth();
  
  layer1 = createGraphics(windowWidth, windowWidth);
  layer2 = createGraphics(windowWidth, windowWidth);

  layer1.clear();
  layer2.clear();

  describe('An invisible canvas on top of the website where the user draws a red line where they move the cursor');
}

function draw() {
  layer1.stroke(0,0,0);
  layer1.strokeWeight(8);
  layer1.strokeJoin(ROUND);
  layer1.line(pmouseX, pmouseY, mouseX, mouseY);
  
  layer2.stroke(255,255,255);
  layer2.strokeWeight(4);
  layer2.strokeJoin(ROUND);
  layer2.line(pmouseX, pmouseY, mouseX, mouseY);

  image(layer1,0,0)
  image(layer2,0,0)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}