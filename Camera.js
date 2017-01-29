function Camera(pos,rot,fov){
	this.position = position;
	this.rotation = rot;
	this.fov = fov;
}
function Camera(){
	this.position = new point3d(-10,-40,20);
	this.rotation = new point3d(Math.PI/2-.2,0,0)
	this.fov = Math.PI/2;
}