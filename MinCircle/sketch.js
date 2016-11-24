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

var xPix = 650 + padding*2;
var yPix = 650 + padding*2;

function setup() {
	createCanvas(xPix,yPix);
	originX = round((xPix - padding*2 - 200)/2);
	originY = originX;
	pSet = new PointSet();


	var sizeForOneSecondCalculation = 63;
	var size = 63;
	for (var i = 0; i < size; i++) {
		pSet.add(new Point(round(random(-30,30)),round(random(-30,30)), 200, i));
	}
		



/*	var p1 = new Point(-27, 29, 200, 0);
	var p2 = new Point(17, 29, 200, 1);
	var p3 = new Point(14, -30, 200, 2); 
	var p4 = new Point(3, 20, 200, 3);

	var C1 = new Circle3(p1, p2, p3);


	print(C1);

	pSet.add(p1);
	pSet.add(p2);
	pSet.add(p3);
//	pSet.add(p4);
*/

	
	
  	background(51);
  	pSet.show();


  	//var C = new Circle3(pSet.P[1], pSet.P[2], pSet.P[3]);
  	//C.show();
  	//var s = pointInCircle2(C, pSet.P[0])
  	//print("S: "+ s);

  	
  	var startTime = millis();
   	var Cmin = minCirc(pSet);
    time = millis() - startTime;
   	fill(255);
	text("Brute Force Time: \t"+(time/1000)+" sec", 10,10);

	Cmin.show();

	startTime = millis();
	var Cmin2 = miniDisc(pSet); 
	time = millis() - startTime;
	fill(255);
	text("Improved Time: \t\t\t"+(time/1000)+" sec", 10,20);
	Cmin2.highlight();


  	

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