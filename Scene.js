
function Scene(objs){
	this.objects = objs;
	
}

function Scene(){
	this.objects = [];
	this.addObject = function(obj){
		this.objects.push(obj)
	}
	
}



