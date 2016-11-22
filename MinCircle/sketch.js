var Pset;

var padding = 23;
var scl = 2;
var originX; 
var originY;

var mouseInputButton;
var randomPointsButton;
var computeHullButton;
var loadPointsButton;
var input;

var xPix = 550 + padding*2;
var yPix = 550 + padding*2;

function setup() {
	createCanvas(xPix,yPix);
	originX = round((xPix - padding*2 - 200)/2);
	originY = originX;
	pSet = new PointSet();
/*

	var fileSelect = createFileInput(gotFile);
	fileSelect.position(220, xPix+padding)
	print(lines);

	randomPointsButton = createButton('Random');
	randomPointsButton.position(0, xPix+padding);
	randomPointsButton.mousePressed(randomGenPointSet);

	computeHullButton = createButton('Compute');
	computeHullButton.position(80, xPix+padding);
	computeHullButton.mousePressed(computeHull);

	loadPointsButton = createButton('Load');
	loadPointsButton.position(160, xPix+padding)
	loadPointsButton.mousePressed(loadPoints);

	mouseInputButton = createButton('ToggleMouseInput');
	mouseInputButton.position(0, xPix+padding + 50);
	mouseInputButton.mousePressed(toggleMouseInput);
	*/
}

function draw() {
  		background(51);
  		minCirc(pSet);
}

function mouseReleased(){
	if(mouseX < width-padding && mouseY < height-padding && mouseActive){
		print(round((mouseX - padding)/scl));
  		pSet.add(new Point((mouseX - padding - originX)/scl, (mouseY - padding - originY)/scl, 255, pointId));
		pointId = pointId + 1;
		updateCan = true;
	}
  }