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