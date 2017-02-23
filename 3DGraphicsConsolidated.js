
function Camera(pos,rot,fov){



	this.position = new point3d(-10,-40,20);
	this.rotation = new point3d(Math.PI/2-.2,0,0)
	this.fov = Math.PI/2;

	if(pos != undefined){
		this.position = pos;
		this.rotation = rot;
		this.fov = fov;
	}
	
	

	this.vel = new point3d(0,0,0);

}


function Keyboard(){
	this.keysDown = [];
	var keys = this.keysDown
	document.addEventListener('keydown', function(event){
	
		var keyChar = String.fromCharCode(event.keyCode);
		if(keys.indexOf(keyChar) == -1){
			
			keys.push(keyChar);
		}


		});

	document.addEventListener('keyup', function(event){
		
		var keyChar = String.fromCharCode(event.keyCode);
		
		if(keys.indexOf(keyChar) > -1){

			keys.splice(keys.indexOf(keyChar),1);
		}


	})
	
	this.vel = new point3d(0,0,0)

	this.doMovement = function(camera){
		var rotSp = .8
		var movement = new point3d(0,0,0)
		if(this.keysDown.indexOf("Q") > -1){
			//camera.position.z+=10;
			movement.z++;

		}
		if(this.keysDown.indexOf("E") > -1){
			//camera.position.z-=10;
			movement.z--;

		}

		if(this.keysDown.indexOf("W") > -1){
			//camera.position.y+=10;
			movement.y++;

		}

		if(this.keysDown.indexOf("S") > -1){
			//camera.position.y-=10;
			movement.y--;
		}
		if(this.keysDown.indexOf("A") > -1){
			//camera.position.x+=10;
			movement.x++;
		}
		if(this.keysDown.indexOf("D") > -1){
			//camera.position.x-=10;
			movement.x--;
		}

		if(this.keysDown.indexOf("&") > -1){
			camera.rotation.x+=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("(") > -1){
			camera.rotation.x-=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("%") > -1){
			camera.rotation.z-=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("'") > -1){
			camera.rotation.z+=.05*rotSp;
			
		}
		//console.log(this.keysDown)

		movement.normalize();
		var speed = -.8

		var forward = new point3d(-Math.cos(Math.PI/2-camera.rotation.z)*Math.sin(camera.rotation.x),Math.sin(Math.PI/2-camera.rotation.z)*Math.sin(camera.rotation.x),Math.sin(-Math.PI/2+camera.rotation.x));
		var left = new point3d(-Math.cos(-camera.rotation.z)*Math.sin(camera.rotation.x),Math.sin(-camera.rotation.z)*Math.sin(camera.rotation.x),0);
		var up = new point3d(-Math.cos(Math.PI/2-camera.rotation.z)*Math.sin(camera.rotation.x+Math.PI/2),Math.sin(Math.PI/2-camera.rotation.z)*Math.sin(camera.rotation.x+Math.PI/2),Math.sin(camera.rotation.x));

		var deltaf = forward//.scale(movement.x)
		deltaf.scale(speed*-movement.y)
		camera.position.add(deltaf);
		var deltal = left
		deltal.scale(speed*movement.x)
		camera.position.add(deltal)
		var deltau = up
		deltau.scale(speed*-movement.z)
		camera.position.add(deltau)
		deltaf.add(deltau)
		deltaf.add(deltal)
		deltaf.scale(1/10)

		this.vel.add( deltaf )
		//console.log(this.vel)
		// this.vel.scale(1/deltaf.magnitude())
		camera.position.add(this.vel)
		this.vel.scale(6/10)
	}




}





function point2d(x,y){
	this.x = x;
	this.y = y;
}

function point3d(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
	this.latestProject;
	this.project = function(camera){
		projectX = Math.cos(camera.rotation.y) * (Math.sin(camera.rotation.z) * (this.y - camera.position.y) + Math.cos(camera.rotation.z) * (this.x - camera.position.x)) - Math.sin(camera.rotation.y) * (this.z - camera.position.z);
		projectY = Math.sin(camera.rotation.x) * (Math.cos(camera.rotation.y) * (this.z - camera.position.z) + Math.sin(camera.rotation.y) * (Math.sin(camera.rotation.z) * (this.y - camera.position.y) + Math.cos(camera.rotation.z) * (this.x - camera.position.x))) + Math.cos(camera.rotation.x) * (Math.cos(camera.rotation.z) * (this.y - camera.position.y) - Math.sin(camera.rotation.z) * (this.x - camera.position.x)) ;
		projectZ = Math.cos(camera.rotation.x) * (Math.cos(camera.rotation.y) * (this.z - camera.position.z) + Math.sin(camera.rotation.y) * (Math.sin(camera.rotation.z) * (this.y - camera.position.y) + Math.cos(camera.rotation.z) * (this.x - camera.position.x))) - Math.sin(camera.rotation.x) * (Math.cos(camera.rotation.z) * (this.y - camera.position.y) - Math.sin(camera.rotation.z) * (this.x - camera.position.x));
		var ez = 1 / Math.tan(camera.fov / 2);
		var screenX = (projectX ) * (ez / projectZ) ;
		var screenY = -(projectY) * (ez / projectZ);
		screenX *= canvas.height;
		screenY *= -canvas.height;
		screenX += canvas.width/2
		screenY += canvas.height/2

		if(projectZ > 0 ){
			this.latestProject = new point3d(-100,-100,-100)
		}
		else{
			this.latestProject = new point3d(screenX,screenY,projectZ)
		}
		return this.latestProject;
		
	}

	this.difference = function(otherPoint){
		var dx = this.x-otherPoint.x;
		var dy = this.y-otherPoint.y;
		var dz = this.z-otherPoint.z;

		var p = new point3d(dx,dy,dz);
		return p.magnitude();

	}

	this.magnitude = function(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
	}

	this.normalize = function(){
		var magnitude = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
		if(magnitude != 0){
			this.x = this.x/magnitude;
			this.y = this.y/magnitude;
			this.z = this.z/magnitude;
		}
		

	}
	this.add = function(otherpoint){
		this.x += otherpoint.x;
		this.y += otherpoint.y;
		this.z += otherpoint.z;
	}
	this.times = function(otherpoint){//dot product
		return new point3d(this.x*otherpoint.x,this.y*otherpoint.y,this.z*otherpoint.z)
	}

	this.scale = function(scalar){
		this.x *=scalar;
		this.y *=scalar;
		this.z *=scalar;
	}

}


function Model(faces, points,centerPoint){
	this.faces = faces;
	this.points = points;
	this.center = new point3d(0,0,0)
	this.rotation = new point3d(0,0,0)
	if(centerPoint != undefined){
		this.center = centerPoint;
	}
	this.translate = function(vector){
		//console.log(this)
		//console.log("translate")
		for(var p = 0; p<this.points.length; p++){
			this.points[p].add(vector);
		}
		this.center.add(vector)
	}
	this.scale = function(scalar){
		//console.log(this)
		//console.log("translate")
		for(var p = 0; p<this.points.length; p++){
			var dx = this.points[p].x-this.center.x
			var dy = this.points[p].y-this.center.y
			var dz = this.points[p].z-this.center.z

			var centerCorrectedPoint = new point3d(dx,dy,dz)
			centerCorrectedPoint.scale(scalar);
			centerCorrectedPoint.add(this.center);
			this.points[p] = centerCorrectedPoint;
		}
		
	}



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
		this.color = ColorLuminance(color,-.6-normal.z -.1)
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


function modelFromObj(obj, sideWays, centerPoint){
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
			//console.log(pointIndexes[1])
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

	if(centerPoint != undefined){
		return new Model(faces, points, centerPoint)
	}
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

function Renderer(){
	console.log("renderer")





	this.renderPrecise = function(scene,canvas,stepCount){

		canvas.context.clearRect(0,0,canvas.width,canvas.height)
		var origin = new point3d(0,0,0)
		var originProject = origin.project(scene.camera);
		canvas.context.fillRect(originProject.x-2.5,originProject.y-2.5,5,5)
		//console.log(JSON.stringify(scene))
		var polys = []
		for(var o = 0; o<scene.objects.length;o++){//project points and create polygons from model faces
			var angle = scene.objects[o].rotation.x
			var center = scene.objects[o].center;
			for(var p = 0; p<scene.objects[o].points.length;p++){
				//scene.objects[o].points[p].scale(Math.sin(9/10+stepCount/10)/10+1)
				//scene.objects[o].points[p].x += .1*Math.cos(stepCount/20);
				//scene.objects[o].points[p].y += .1*Math.sin(stepCount/20);
				/*var point = scene.objects[o].points[p];



				var dx = -center.x + point.x;
				var dy = -center.y + point.y;
				
				
				var unitX = dy
				var unitY = -dx;
				

				
				point.x += (unitX/100 ) ;
				point.y += (unitY/100) ;*/
				
				

				//point.y = Math.sin(center.difference(point));
				scene.objects[o].points[p].project(scene.camera);
			}
			for(var f = 0; f<scene.objects[o].faces.length;f++){
				var face = scene.objects[o].faces[f]
				// console.log(f)
				// console.log(fac2*				// console.log(scene.objects[o].points[face.a])
				var a = scene.objects[o].points[face.a-1].latestProject;
				var b = scene.objects[o].points[face.b-1].latestProject;
				var c = scene.objects[o].points[face.c-1].latestProject;
				if(face.d != undefined){
					var d = scene.objects[o].points[face.d-1].latestProject;
					polys.push(new Polygon(a,b,c,face.color,d))
					//console.log(123)
				}
				else{
					polys.push(new Polygon(a,b,c,face.color))
				}
				
			}

		}
		polys.sort(function(a,b){return b.z-a.z});//sort by dist from camera
		//console.log(JSON.stringify(polys[0]))
		var pixelImage = canvas.context.createImageData(1,1); // only do this once per page
		var pixel  = pixelImage.data; 
		for(var i = 0; i<polys.length;i++){
			if(polys[i].d != undefined){
				if(polys[i].a.z > -2 || polys[i].b.z>-2 ||polys[i].c.z > -2 || polys[i].d.z>-2){

				}
				else{

					var top = a.y;
					if(b.y > top){top = b.y}
					if(c.y > top){top = c.y}
					if(d.y > top){top = d.y}
					var bot = a.y;
					if(b.y < bot){bot = b.y}
					if(c.y < bot){bot = c.y}
					if(d.y < bot){bot = d.y}
					var left = a.x;
					if(b.x < left){left = b.x}
					if(c.x < left){left = c.x}
					if(d.x < left){left = d.x}
					var right = a.x;
					if(b.x > right){right = b.x}
					if(c.x > right){right = c.x}
					if(d.x > right){right = d.x}
						//console.log(top + "   " + bot)
					for(var r = bot; r< top; r++){
						console.log(123)
						for(var c = left; c < right; c++){
							pixel[0]   = 10;
							pixel[1]   = 200;
							pixel[2]   = 200;
							pixel[3]   = 1;
							//canvas.context.fillRect(c,r,1,1)

						}
					}

					/*
					canvas.context.fillStyle = polys[i].color;

					canvas.context.beginPath();
					canvas.context.moveTo(polys[i].a.x, polys[i].a.y)

					canvas.context.lineTo(polys[i].b.x, polys[i].b.y)

					canvas.context.lineTo(polys[i].c.x, polys[i].c.y)
					canvas.context.lineTo(polys[i].d.x, polys[i].d.y)
					canvas.context.lineTo(polys[i].a.x, polys[i].a.y)

					canvas.context.closePath();
					canvas.context.stroke();
					*/
				}
			}
			else{
				if(polys[i].a.z > -2 || polys[i].b.z>-2 ||polys[i].c.z > -2){

				}
				else{
					canvas.context.fillStyle = polys[i].color;
					canvas.context.beginPath();
					canvas.context.moveTo(polys[i].a.x, polys[i].a.y)
					canvas.context.lineTo(polys[i].b.x, polys[i].b.y)
					canvas.context.lineTo(polys[i].c.x, polys[i].c.y)
					canvas.context.lineTo(polys[i].a.x, polys[i].a.y)

					canvas.context.closePath();

					canvas.context.fill();
				}
			}
			


			
		}



	}






	this.render = function(scene,canvas,stepCount){

		canvas.context.clearRect(0,0,canvas.width,canvas.height)
		var origin = new point3d(0,0,0)
		var originProject = origin.project(scene.camera);
		canvas.context.fillRect(originProject.x-2.5,originProject.y-2.5,5,5)
		//console.log(JSON.stringify(scene))
					//console.log(1)

		var polys = []
		for(var o = 0; o<scene.objects.length;o++){//project points and create polygons from model faces
			var angle = scene.objects[o].rotation.x
			//console.log("render")
			var center = scene.objects[o].center;
			for(var p = 0; p<scene.objects[o].points.length;p++){
				//scene.objects[o].points[p].scale(Math.sin(9/10+stepCount/10)/10+1)
				//scene.objects[o].points[p].x += .1*Math.cos(stepCount/20);
				//scene.objects[o].points[p].y += .1*Math.sin(stepCount/20);
				var point = scene.objects[o].points[p];



				var dx = -center.x + point.x;
				var dy = -center.y + point.y;
				
				
				var unitX = dy
				var unitY = -dx;
				

				
				point.x += (unitX/100 ) ;
				point.y += (unitY/100) ;
				
				

				//point.y = Math.sin(center.difference(point));
				scene.objects[o].points[p].project(scene.camera);
			}
			for(var f = 0; f<scene.objects[o].faces.length;f++){
				var face = scene.objects[o].faces[f]
				// console.log(f)
				// console.log(fac2*				// console.log(scene.objects[o].points[face.a])
				var a = scene.objects[o].points[face.a-1].latestProject;
				var b = scene.objects[o].points[face.b-1].latestProject;
				var c = scene.objects[o].points[face.c-1].latestProject;
				if(face.d != undefined){
					var d = scene.objects[o].points[face.d-1].latestProject;
					polys.push(new Polygon(a,b,c,face.color,d))
					//console.log(123)
				}
				else{
					polys.push(new Polygon(a,b,c,face.color))
				}
				
			}

		}
		polys.sort(function(a,b){return b.z-a.z});//sort by dist from camera
		//console.log(JSON.stringify(polys[0]))

		for(var i = 0; i<polys.length;i++){

			if(polys[i].d != undefined){
				if(polys[i].a.z > -2 || polys[i].b.z>-2 ||polys[i].c.z > -2 || polys[i].d.z>-2){
					
				}
				else{
					var a = polys[i].a;
					var b = polys[i].b
					var c = polys[i].c
					var d = polys[i].d
					

					/*var g = {"top":a,"bot":a,"left":a,"right":a}
					if(b.y > top){g.top = b}
					if(c.y > top){g.top = c}
					if(d.y > top){g.top = d}
					
					if(b.y < bot){g.bot = b}
					if(c.y < bot){g.bot = c}
					if(d.y < bot){g.bot = d}
					
					
					if(b.x < left){g.left = b}
					if(c.x < left){g.left = c}
					if(d.x < left){g.left = d}
					
					if(b.x > right){g.right = b}
					if(c.x > right){g.right = b}
					if(d.x > right){g.right = b}
					g.right.x+=100;
					g.left.x-=100;
					g.top.y+=10;
					g.top.y-=1;*/

					canvas.context.fillStyle = polys[i].color;

					canvas.context.beginPath();
					canvas.context.moveTo(a.x, a.y)
					canvas.context.lineTo(b.x, b.y)
					canvas.context.lineTo(c.x, c.y)
					canvas.context.lineTo(d.x, d.y)
					canvas.context.lineTo(a.x, a.y)

					canvas.context.closePath();

					canvas.context.fill();
					canvas.context.fill();
					canvas.context.fill();
				}
			}
			else{
				if(polys[i].a.z > -2 || polys[i].b.z>-2 ||polys[i].c.z > -2){
					
				}
				else{

					var a = polys[i].a;
					var b = polys[i].b
					var c = polys[i].c
					

					canvas.context.fillStyle = polys[i].color;
					canvas.context.beginPath();
					canvas.context.moveTo(a.x, a.y)
					canvas.context.lineTo(b.x, b.y)
					canvas.context.lineTo(c.x, c.y)
					canvas.context.lineTo(a.x, a.y)

					canvas.context.closePath();

					canvas.context.fill("evenodd");
					canvas.context.fill();
				}
			}
			


			
		}



	}

	console.log(this.render)

	

}


function Scene(objs,cam,keys){
	
	this.objects = objs;
	this.camera = cam;
	this.keyboard = keys;





	this.addObject = function(obj){
		this.objects.push(obj)
	}




	
}






function Graphics(c) {

	
	
	console.log("graphics")
	this.canvas = {"width":c.width,"height":c.height,"context":c.getContext('2d')};
	
	this.renderer = new Renderer();

	this.stepCount = 0;
	this.scene = undefined;

	this.step = function(){
		this.stepCount++;
		
		//this.canvas.context.clearRect(0,0,canvas.width,canvas.height)
		
		if(this.scene != undefined){
			

			this.scene.keyboard.doMovement(this.scene.camera);
			
		}
		
		this.renderer.render(this.scene,this.canvas,this.stepCount);
		var self = this;
		window.setTimeout(function(){self.step()},10)
	}


	this.addCamera = function(pos, rot){
		this.camera = new Camera(pos,rot,Math.PI/2);
		camera = this.camera;
	}
	this.addCamera = function(){
		this.camera = new Camera();
		camera = this.camera;

	}

	this.setScene = function(s){
		this.scene = s;
	}

	this.addTestScene = function(){
		//var points = [new point3d(-1,-1,0),new point3d(-1,1,0),new point3d(1,1,0),new point3d(1,-1,0),
					  //new point3d(-1,-1,2),new point3d(-1,1,2),new point3d(1,1,2),new point3d(1,-1,2),]
		//var faces = [new Face(0,1,2,3),new Face(4,5,6,7),new Face(0,1,5,4),new Face(1,2,6,5),new Face(2,3,7,6),new Face(0,3,7,4)];
		//var obj = new Model(faces,points);
		//scene.addObject(obj)

		//console.log(obj)
		
		console.log("done adding test scene")
	}
	
	this.begin = function(){
		if(this.scene != undefined){
			console.log("begin")
			console.log(this.scene)
			this.step();
		}
		else{
			console.log("no scene defined, use Graphics.setScene(s)")
		}
		

	}


	
}







