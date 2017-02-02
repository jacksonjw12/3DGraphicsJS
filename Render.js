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