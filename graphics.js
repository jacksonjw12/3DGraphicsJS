
var urls = ["Points.js","Scene.js","Camera.js","Keyboard.js","Render.js","Object.js","Testscene.js"]

var numLoaded = 0;
var isLoaded = false;

loadScripts(urls,countLoaded);

function countLoaded(){
	numLoaded++;
	if(numLoaded == urls.length){
		isLoaded();
	}
}

function loadScripts(urls, callback)
{
	console.log("loading scripts")
    // Adding the script tag to the head as suggested before
    for(var i = 0; i < urls.length-1; i++){
    	var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = urls[i];

	    // Then bind the event to the callback function.
	    // There are several events for cross browser compatibility.
	    script.onreadystatechange = callback;
    	script.onload = callback;
	    document.body.appendChild(script);

	}
	var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urls[urls.length-1];
    script.onreadystatechange = callback;
    script.onload = callback;
    
   
    document.body.appendChild(script);
}
var camera;
var scene;
var renderer;
var keys
function step(){
	canvas.context.clearRect(0,0,canvas.width,canvas.height)
	doMovement();

	renderer.render(camera,scene);
	setTimeout(step,30)
}

function Graphics(c) {
	keys = new Keyboard();
	keys.initialize(keys);
	camera = new Camera();
	scene = new Scene();
	renderer = new Renderer()
	console.log("created graphics")
	canvas = {"width":c.width,"height":c.height,"context":c.getContext('2d')};
	
	this.addCamera = function(pos, rot){
		this.camera = new Camera(pos,rot,Math.PI/2);
		camera = this.camera;
	}
	this.addCamera = function(){
		this.camera = new Camera();
		camera = this.camera;

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
		console.log("begin")
		step();

	}


	
}







