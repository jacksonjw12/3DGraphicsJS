

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



