function Point(x, y, c, id) {
	this.id = id
	this.x = x;
	this.y = y;
	this.c = c;
	this.o = 255;

	this.show = function() {
		stroke(0);
		fill(this.c, this.o);
		rect(round(this.x + padding/scl + originX/scl)*scl, round(this.y + padding/scl + originY/scl)*scl, 2, 2);
		fill(0);
		rect(round(this.x + padding/scl + originX/scl)*scl, round(this.y + padding/scl + originY/scl)*scl, 1, 1);
		fill(0);
		textSize(8);
		text(this.id, round(this.x + padding/scl + originX/scl)*scl + 2, round(this.y + padding/scl + originY/scl)*scl + 9);
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
		this.connect(255);
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

function Circ(x, y, w){
	this.x = round(x + padding/scl + originX/scl)*scl;
	this.y = round(y + padding/scl + originY/scl)*scl;
	this.w = w*scl;

	this.show = function(){
		stroke(0);
		fill(125);
		ellipse(this.x, this.y, this.w, this.w);
	}
}

function Circle2(p1, p2){
	this.p1 = p1;
	this.p2 = p2;

	this.mid = new Point((this.p1.x + this.p2.x)/2, (this.p1.y + this.p2.y)/2, 0, 5);
	this.w = sqrt(pow(this.p1.x - this.p2.x, 2) + pow(this.p1.y - this.p2.y, 2));

	this.reCreate = function(){
		var dx = (this.p1.x + this.p2.x)/2;
		var dy = (this.p1.y + this.p2.y)/2;
		this.mid = new Point(dx, dy, 0, 5);

		this.w = sqrt(pow(this.p1.x - this.p2.x, 2) + pow(this.p1.y - this.p2.y, 2));
	}

	this.show = function(){
		if(this.mid != null){
			stroke(0);
			fill(125);
			ellipse(round(this.mid.x + padding/scl + originX/scl)*scl, round(this.mid.y + padding/scl + originY/scl)*scl, this.w*scl, this.w*scl);
		}
	}
}

function Circle3(p1, p2, p3){
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;

	this.mid;
	this.w;

	this.reCreate = function(){

		var P = this.p1;
		var Q = this.p2;
		var R = this.p3;

		var PQmid = new Point((P.x + Q.x)/2, (P.y + Q.y)/2, 0, 2);
		var QRmid = new Point((Q.x + R.x)/2, (Q.y + R.y)/2, 0, 2);

		var PQgrad = (Q.y - P.y) / (Q.x - P.y);
		var QRgrad = (R.y - Q.y) / (R.x - Q.y);

		var x = (QRmid.y - (QRmid.x/PQgrad) + (PQmid.x/QRgrad) - PQmid.y)/(1/QRgrad - 1/PQgrad);
		var y = (-1/QRgrad)*(x - QRmid.x) + PQmid.y;

		//var m1 = (p2.y - p1.y) / (p2.x - p1.x);
        //var m2 = (p3.y - p2.y) / (p3.x - p2.x);

        //var x = (m1 * m2 * (p3.y - p1.y) + m1 * (p2.x + p3.x) + m2 * (p1.x + p2.x)) / (2 * (m1 - m2));
        //var y = (1 / m1) * (x - (p1.x + p2.x) / 2) + (p1.y + p2.y) / 2;
        this.mid = new Point(x, y, 0, 2);
        this.w = sqrt(pow(this.mid.x - this.p3.x, 2) + pow(this.mid.y - this.p3.y, 2));
	}

	this.show = function(){
		if(this.mid != null){
			stroke(0);
			fill(125);
			ellipse(round(this.mid.x + padding/scl + originX/scl)*scl, round(this.mid.y + padding/scl + originY/scl)*scl, this.w*scl, this.w*scl);
		}
	}
}

function minCirc(set){
	//var Cmin = new Circ(new Point(-200,0,0,1), new Point(200,0,0,1));
	//Cmin.show();

	var p1 = new Point(60,40, 0, 1);
	var p2 = new Point(20, 20, 0, 1);
	var p3 = new Point(10, 25, 0, 1);
	var C = new Circle3(p1, p2, p3);
	C.reCreate();
	C.show();
	p1.show();
	p2.show();
	p3.show();

}

function pointInCircle(a, b, c, d){
	var adx = 1;
}