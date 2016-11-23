var Pset;

var padding = 0;
var scl = 5;
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

	var p1 = new Point(-11,5, 200, 1);
	var p2 = new Point(0,-10, 200, 2);
	var p3 = new Point(2,1, 200, 3);
	var p4 = new Point(-2,1, 200, 4);

	pSet.add(p1);
	pSet.add(p2);
	pSet.add(p3);
	pSet.add(p4);


  	background(51);
  	pSet.show();

  	//var C = new Circle3(pSet.P[1], pSet.P[2], pSet.P[3]);
  	//C.show();
  	//var s = pointInCircle3(C.p1, C.p2, C.p3, pSet.P[0])
  	//print("S: "+ s);
   	minCirc(pSet);

  	

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
	frameRate(1);


  //	background(51);
  //	pSet.show();
  //	minCirc(pSet);
}

function mouseReleased(){
	if(mouseX < width-padding && mouseY < height-padding && mouseActive){
		print(round((mouseX - padding)/scl));
  		pSet.add(new Point((mouseX - padding - originX)/scl, (mouseY - padding - originY)/scl, 255, pointId));
		pointId = pointId + 1;
		updateCan = true;
	}
  }