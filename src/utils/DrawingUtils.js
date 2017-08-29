class DrawingUtils {

	constructor(){
		this.isDrawing = false;
		this.mouseStartPos = [];
		this.mode = 'circle';
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDrag = this.onMouseDrag.bind(this);
		this.draw = this.draw.bind(this);
		this.drawings = [];
		this.saveDrawing = this.saveDrawing.bind(this);
		this.recreate = this.recreate.bind(this);
	}

	setCanvasAndContext(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	onMouseDown(evt){
		this.isDrawing = true;
		const rect = this.canvas.getBoundingClientRect();
		let x = rect.left + evt.clientX;
		let y = rect.top + evt.clientY;

		this.mouseStartPos = [x,y];

	}

	onMouseDrag(evt){
		if(this.isDrawing){
			const rect = this.canvas.getBoundingClientRect();
			let x = rect.left + evt.clientX;
			let y = rect.top + evt.clientY;
			this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
			this.recreate();
			this.draw(this.mouseStartPos, [x,y]);
		}
	}

	onMouseUp(evt){
		const rect = this.canvas.getBoundingClientRect();
		let x = rect.left + evt.clientX;
		let y = rect.top + evt.clientY;
		this.isDrawing = false;
		this.draw(this.mouseStartPos, [x,y]);
	}

	saveDrawing(pos,r){
		let drawing = {pos,r};
		this.drawings.push(drawing);
	}

	recreate(){
		for(let i = 0; i < this.drawings.length; i++){
			let drawing = this.drawings[i];
			this.context.beginPath();
			this.context.arc(drawing.pos[0], drawing.pos[1], drawing.r, 0, 2 * Math.PI);
			this.context.stroke();
			this.context.closePath();
		}
	}

	draw(start,end){
		let r = Math.abs(start[0] - end[0]);
		this.context.beginPath();
		this.context.arc(start[0], start[1], r, 0, 2 * Math.PI);
		this.context.stroke();
		this.context.closePath();

		if(!this.isDrawing){
			let pos = start;
			this.saveDrawing(pos,r);
		}

	}
}

export default DrawingUtils;
