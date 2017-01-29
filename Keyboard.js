

function Keyboard(){
	this.keysDown = [];
	this.initialize = function(keys){
		document.addEventListener('keydown', function(event){
		
			var keyChar = String.fromCharCode(event.keyCode);
			if(keys.keysDown.indexOf(keyChar) == -1){
				
				keys.keysDown.push(keyChar);
			}


			});

		document.addEventListener('keyup', function(event){
			
			var keyChar = String.fromCharCode(event.keyCode);
			
			if(keys.keysDown.indexOf(keyChar) > -1){

				keys.keysDown.splice(keys.keysDown.indexOf(keyChar),1);
			}


		})
	}


}


function doMovement(){

	var movement = new point3d(0,0,0)
	if(keys.keysDown.indexOf("Q") > -1){
		//camera.position.z+=10;
		movement.z++;

	}
	if(keys.keysDown.indexOf("E") > -1){
		//camera.position.z-=10;
		movement.z--;

	}

	if(keys.keysDown.indexOf("W") > -1){
		//camera.position.y+=10;
		movement.y++;

	}

	if(keys.keysDown.indexOf("S") > -1){
		//camera.position.y-=10;
		movement.y--;
	}
	if(keys.keysDown.indexOf("A") > -1){
		//camera.position.x+=10;
		movement.x++;
	}
	if(keys.keysDown.indexOf("D") > -1){
		//camera.position.x-=10;
		movement.x--;
	}

	if(keys.keysDown.indexOf("&") > -1){
		camera.rotation.x+=.05;
		
	}
	if(keys.keysDown.indexOf("(") > -1){
		camera.rotation.x-=.05;
		
	}
	if(keys.keysDown.indexOf("%") > -1){
		camera.rotation.z-=.05;
		
	}
	if(keys.keysDown.indexOf("'") > -1){
		camera.rotation.z+=.05;
		
	}
	//console.log(keys.keysDown)

	movement.normalize();
	var speed = -1

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

}