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







