function Model(faces, points){
	this.faces = faces;
	this.points = points;
}
function Face(points,a,b,c,color,d){
		//this.color = shadeColor1(color,t*a.latestProject.x*t/25 * Math.pow(Math.abs(b.z-a.z)*Math.abs(c.z-d.z)*Math.abs(a.z-d.z)*Math.abs(b.z-c.z), .25)/-5 * (c.z-d.z)/(Math.abs(c.z-d.z)+.1) );
		//find normal
		//console.log(points[0])
		var v1 = new point3d(points[1].x-points[0].x,points[1].y-points[0].y,points[1].z-points[0].z)
		var v2 = new point3d(points[2].x-points[0].x,points[2].y-points[0].y,points[2].z-points[0].z)

		var i = v1.y*v2.z-v1.z*v2.y
		var j = v1.z*v2.x-v1.z*v2.x
		var k = v1.x*v2.y-v1.y*v2.x
		var normal = new point3d(i,j,k)
		normal.normalize()
		//console.log(k)

		//this.color = color;
		this.color = ColorLuminance(color,-normal.z/1.4+normal.x/10 + normal.y/10 -.1)
		this.a = a;
		this.b = b;
		this.c = c;
		if(d != undefined){
			this.d = d;
		}
		
		//this.z = -this.a.z;
}


function Polygon(a,b,c,color,d){
		this.color = color;
		//this.color = shadeColor1(color,a.latestProject.x );

		this.a = a;
		this.b = b;
		this.c = c;
		if(d != undefined){
			this.d = d;
			this.z = Math.sqrt(a.z*a.z+b.z*b.z+c.z*c.z+d.z*d.z);
		}
		else{
			this.z = Math.sqrt(a.z*a.z+b.z*b.z+c.z*c.z);

		}
		
}

var colors = ["red","green","blue","orange","purple","black"];
var colorNum = 0;
function getColor(){

	
	colorNum++;
	if(colorNum > colors.length-1){
		colorNum = 0;
	}
	return colors[colorNum];
}


function modelFromObj(obj, sideWays){
	var points = []
	var faces = []
	currentColor = "#000000";
	for(var l = 0; l<obj.length; l++){
		if(obj[l].charAt(0) == "v"){
			var coords = obj[l].split(" ");
			if(sideWays){
				var x = 1*(coords[1])
				var z = 1*(coords[2])
				var y = 1*(coords[3])
				points.push(new point3d(x,y,z))
			}
			else{
				var x = 1*(coords[1])
				var y = 1*(coords[2])
				var z = 1*(coords[3])
				points.push(new point3d(x,y,z))
			}
			
		}
		else if(obj[l].charAt(0) == "f"){
			var pointIndexes = obj[l].split(" ");
			var a = 1*(pointIndexes[1]);
			var b = 1*(pointIndexes[2]);
			var c = 1*(pointIndexes[3]);

			if(pointIndexes.length == 5){
				var d = 1*(pointIndexes[4]);
				var ps = [points[a-1],points[b-1],points[c-1],points[d-1]]
				faces.push(new Face(ps,a,b,c,currentColor,d))
			}
			else{
				var ps = [points[a-1],points[b-1],points[c-1]]
				faces.push(new Face(ps,a,b,c,currentColor))
			}
			
		}
		else if(obj[l].charAt(0) == "u"){
			var lineSplit = obj[l].split(" ");
			var color = "#" + lineSplit[1]
			currentColor = color;
		}
	}
	console.log(points[0])

	return new Model(faces,points)
}



function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}


function shadeColor1(color, percent) { 
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
