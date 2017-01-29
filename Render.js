function Renderer(){
	console.log("renderer")

	this.render = function(camera,scene){

		var origin = new point3d(0,0,0)
		var originProject = origin.project();
		canvas.context.fillRect(originProject.x-2.5,originProject.y-2.5,5,5)
		//console.log(JSON.stringify(scene))
		var polys = []
		for(var o = 0; o<scene.objects.length;o++){//project points and create polygons from model faces
			for(var p = 0; p<scene.objects[o].points.length;p++){
				scene.objects[o].points[p].project();
			}
			for(var f = 0; f<scene.objects[o].faces.length;f++){
				var face = scene.objects[o].faces[f]
				// console.log(f)
				// console.log(face)
				// console.log(scene.objects[o].points[face.a])
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

					canvas.context.fillStyle = polys[i].color;
					canvas.context.beginPath();
					canvas.context.moveTo(polys[i].a.x, polys[i].a.y)
					canvas.context.lineTo(polys[i].b.x, polys[i].b.y)
					canvas.context.lineTo(polys[i].c.x, polys[i].c.y)
					canvas.context.lineTo(polys[i].d.x, polys[i].d.y)
					canvas.context.lineTo(polys[i].a.x, polys[i].a.y)

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

	
	

	
	/*var polys = []

	for(var y = 0; y<func.length-1; y++){
		for(var x = 0; x<func[0].length-1; x++){
			changeColor()
			polys.push(new Polygon(func[y][x],func[y+1][x],func[y+1][x+1],func[y][x+1]));

		}
		
	}

	//console.log(polys[0].z)
	polys.sort(function(a,b){return b.z-a.z});

	for(var i = 0; i<polys.length;i++){
		if(polys[i].a.z > -20 || polys[i].b.z>-20 ||polys[i].c.z > -20 || polys[i].d.z>-20){

		}
		else{
			canvas.context.fillStyle = polys[i].color;
			canvas.context.beginPath();
			canvas.context.moveTo(polys[i].a.x, polys[i].a.y)
			canvas.context.lineTo(polys[i].b.x, polys[i].b.y)
			canvas.context.lineTo(polys[i].c.x, polys[i].c.y)
			canvas.context.lineTo(polys[i].d.x, polys[i].d.y)
			canvas.context.lineTo(polys[i].a.x, polys[i].a.y)

			canvas.context.closePath();

			canvas.context.fill();
		}
		
	}
*/

	

}