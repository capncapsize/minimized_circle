function Point(x, y, c, id) {
	this.id = id
	this.x = x;
	this.y = y;
	this.c = c;
	this.o = 255;

	this.show = function() {
		stroke(this.c);
		fill(this.c, this.o);
		rect(round(this.x + padding/scl + originX/scl)*scl, round(this.y + padding/scl + originY/scl)*scl, 2, 2);
		stroke(0)
		fill(255);
		//rect(round(this.x + padding/scl + originX/scl)*scl, round(this.y + padding/scl + originY/scl)*scl, 1, 1);
		//fill(0);
		textSize(8);
		text(this.id + "(" + this.x + "," + this.y +")", round(this.x + padding/scl + originX/scl)*scl + 2, round(this.y + padding/scl + originY/scl)*scl + 9);
	}
}

function PointSet(){
	this.P = []
	this.repeatedSort = false;

	this.add = function(p){
		append(this.P, p);
	}

	this.qsort = function(sortAfter){
		var tmp = [];

		for (var i = 0; i < this.P.length; i++) {
			append(tmp, this.P[i]);
		}
		repeatedSort = false;
		if(sortAfter == 'x'){
			this.P.sort(this.compareToX);
			print("Compare X");
			if(repeatedSort == true){
				//this.P = tmp;
			}
		}else{
			this.P.sort(this.compareToY);
			print("Compare Y");
			if(repeatedSort == true){
				this.P = tmp;
			}
		}
		return repeatedSort;
	}

	this.show = function(){
		//this.connect(255);
		for (var i = this.P.length - 1; i >= 0; i--) {
    		this.P[i].show();
  		}
	}

	this.connect = function(c){
		stroke(c);
		for(var i = this.P.length - 2; i>=0;i--){
			line(this.P[i].x*scl, this.P[i].y*scl, this.P[i+1].x*scl, this.P[i+1].y*scl);
		}
	}

	this.compareToY = function(a, b){
		if(a.y == b.y){
			repeatedSort = true;
			print("Y failed");
		}
		return a.y - b.y;
	}	

		this.compareToX = function(a, b){
		if(a.x == b.x){
			repeatedSort = true;
			print("X failed");
		}
		return a.x - b.x;
	}
}

function Circle2(p1, p2){
	this.p1 = p1;
	this.p2 = p2;

	this.mid;// = new Point((this.p1.x + this.p2.x)/2, (this.p1.y + this.p2.y)/2, 0, 5);
	this.w;// = sqrt(pow(this.p1.x - this.p2.x, 2) + pow(this.p1.y - this.p2.y, 2));

	this.reCreate = function(){
		var dx = (this.p1.x + this.p2.x)/2;
		var dy = (this.p1.y + this.p2.y)/2;
		this.mid = new Point(dx, dy, 0, 5);
		this.w = sqrt(pow(this.p1.x - this.p2.x, 2) + pow(this.p1.y - this.p2.y, 2));
	}

	this.show = function(){
		if(this.mid != null){
			stroke(0);
			fill(125,100);
			ellipse(round(this.mid.x + padding/scl + originX/scl)*scl, round(this.mid.y + padding/scl + originY/scl)*scl, this.w*scl, this.w*scl);
		}
	}

	this.highlight = function(){
			p1.c = [90,255,20];
			p2.c = [90,255,20];

			p1.show();
			p2.show();		
	}

	this.reCreate();
}

function Circle3(p1, p2, p3){
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;

	this.mid;
	this.w;

	this.reCreate = function(){

	if(this.p2.x - this.p1.x == 0){
		var p1 = this.p1;
		var p3 = this.p2;
		var p2 = this.p3;
	}else if(this.p3.x - this.p2.x == 0){
		var p2 = this.p1;
		var p1 = this.p2;
		var p3 = this.p3;
	}else{
		var p1 = this.p1;
		var p2 = this.p2;
		var p3 = this.p3;
	}

/*		var PQmid = new Point((P.x + Q.x)/2, (P.y + Q.y)/2, 0, 2);
		var QRmid = new Point((Q.x + R.x)/2, (Q.y + R.y)/2, 0, 2);

		var PQgrad = (Q.y - P.y) / (Q.x - P.x);
		var QRgrad = (R.y - Q.y) / (R.x - Q.x);

		var L1grad = -1/PQgrad;
		var L2grad = -1/QRgrad;

		print("PQmid: ("+PQmid.x+", "+PQmid.y+")");
		print("QRmid: ("+QRmid.x+", "+QRmid.y+")");
		print("PQgrad: "+PQgrad+" QRgrad: "+QRgrad);

		var x = (-L1grad*PQmid.x + PQmid.y - QRmid.y + L2grad*QRmid.x)/(L2grad - L1grad);
		var y = L1grad*(x - PQmid.x) + PQmid.y;*/



		var m1 = (p2.y - p1.y) / (p2.x - p1.x);
        var m2 = (p3.y - p2.y) / (p3.x - p2.x);

        //print("m1: "+m1+",m2: "+m2);

        var x = (m1 * m2 * (p1.y - p3.y) - m1 * (p2.x + p3.x) + m2 * (p1.x + p2.x)) / (2 * (m2 - m1));
        if(m2 == 0){
        	var y = (-1 / m1) * (x - (p1.x + p2.x) / 2) + (p1.y + p2.y) / 2;
    	}else{
    		var y = (-1 / m2) * (x - (p2.x + p3.x) / 2) + (p2.y + p3.y) / 2;
    	}

        //print("x: "+x+",y: "+y);

        this.mid = new Point(x, y, 0, 2);
        this.w = sqrt(pow(p1.x - x, 2) + pow(p1.y - y, 2))*2;
	}


	this.show = function(){
		if(this.mid != null){
			stroke(0);
			fill(125,100);
			ellipse((this.mid.x + padding/scl + originX/scl)*scl, (this.mid.y + padding/scl + originY/scl)*scl, this.w*scl, this.w*scl);
		}
	}

	this.highlight = function(){
			p1.c = [90,255,20];
			p2.c = [90,255,20];
			p3.c = [90,255,20];

			p1.show();
			p2.show();
			p3.show();			
	}

	this.reCreate();
}

function minCirc(set){
	var C;
	var s;
	var Cmin = new Circle2(new Point(-200,0,0,1), new Point(200,0,0,1));
	//print("---TWO POINT---");
	//Two point circle
	for (var i = 0; i < set.P.length; i++) {
		for (var j = 0; j < set.P.length; j++) {
			if(i != j){
				C = new Circle2(set.P[i], set.P[j]);
				//C.show();
				for (var k = 0; k < set.P.length; k++){
					if(i != k && j != k){
						s = pointInCircle(C, set.P[k]);
						//print("Cir("+set.P[i].id+", "+set.P[j].id+") then "+ set.P[j].id + " is :" + s);
						if(s < 0){
							//print(set.P[k].id + ": is outside");
							C = null;
							break;
						}
					
					}
				}
				if(C != null && C.w < Cmin.w){
					Cmin = C;
					//print("Found smaller circle Cir("+set.P[i].id+", "+set.P[j].id+")");
				}
			}
		}
	}
	//Cmin.show();
	//print("---THREE POINT---");
	//Three point circle
	for (var i = 0; i < set.P.length; i++){
		for (var j = 0; j < set.P.length; j++){
			if(i != j){
				for (var k = 0; k < set.P.length; k++){
					if(i != k && j != k){
						C = new Circle3(set.P[i], set.P[j], set.P[k]);
						//print("TESTING Cir("+set.P[i].id+", "+set.P[j].id+", " +set.P[k].id+") ");
						for(var l = 0; l < set.P.length; l++){
							if(i != l && j != l && k != l){
								s = pointInCircle(C, set.P[l]);
								if(s < 0){
									//print(set.P[l].id + ": is outside");
									C = null;
									break;
								}
							}
						}
						if(C != null && C.w < Cmin.w){
							Cmin = C;
							//print("Found smaller circle Cir("+set.P[i].id+", "+set.P[j].id+", " +set.P[k].id+")");
						}
					}
				}
			}

		}
	}
	return Cmin;
}

function pointInCircle(C, d){
	var sign;
	var l = sqrt(pow(C.mid.x - d.x, 2) + pow(C.mid.y - d.y, 2));
	if(l > C.w/2){
		sign = -1;
	}else{
		sign = 1;
	}
	return sign;
}

/*
function pointInCircle3(a, b, c, d){
	var adx = a.x - d.x;
	var ady = a.y - d.y;
	var bdx = b.x - d.x;
	var bdy = b.y - d.y;
	var cdx = c.x - d.x;
	var cdy = c.y - d.y;
	var abdet = adx*bdy - bdx*ady;
	var bcdet = bdx*cdy - cdx*bdy;
	var cadet = cdx*ady - adx*cdy;
	var alift = adx*adx + ady*ady;
	var blift = bdx*bdx + bdy*bdy;
	var clift = cdx*cdx + cdy*cdy;
	var sign = alift*bcdet + blift*cadet + clift*abdet;
	return sign;
}
*/


function miniDisc(set){
	var P = shuffle(set.P);
	C = new Circle2(P[0], P[1]);
	for (var i = 2; i < P.length; i++) {
		if(pointInCircle(C, P[i]) < 0){
			//print("pointi "+i+" "+set.P[i].id+" is outside");
			//print(C);
			C = miniDiscWithPoint(subset(P,0,i), P[i]);
		}
	}

	return C
}

function miniDiscWithPoint(P, q){
	//print(P);
	//print(q);
	P = shuffle(P);
	C = new Circle2(q, P[0]);

	for (var j = 1; j < P.length; j++) {
		if(pointInCircle(C, P[j]) < 0){
			//print("pointj "+P[j].id+" is outside");
			//print(C);
			C = miniDiscWith2Points(subset(P, 0, j), P[j], q);
		}
	}
	return C
}

function miniDiscWith2Points(P, q1, q2){
	C = new Circle2(q1, q2);

	for (var k = 0; k < P.length; k++) {
		if(pointInCircle(C, P[k]) < 0){
			//print("pointk "+P[k].id+" is outside");
			//print(C);
			C = new Circle3(q1, q2, P[k]);
		}
	}
	return C;

}

