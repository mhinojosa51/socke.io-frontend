class DrawingUtils {

	constructor(){
		this.isDrawing = false;
		this.mouseStartPos = [];
		this.mode = 'circle';
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDrag = this.onMouseDrag.bind(this);
		this.draw = this.draw.bind(this);
	}

	setCanvasAndContext(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	onMouseDown(evt){
		console.log(evt);
		this.isDrawing = true;
		const rect = this.canvas.getBoundingClientRect();
		let x = rect.left + evt.clientX;
		let y = rect.top + evt.clientY;

		this.mouseStartPos = [x,y];

		console.log(this.mouseStartPos);
	}

	onMouseDrag(evt){
		if(this.isDrawing){
			const rect = this.canvas.getBoundingClientRect();
			let x = rect.left + evt.clientX;
			let y = rect.top + evt.clientY;
			this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
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

	draw(start,end){
		let r = Math.abs(start[0] - end[0]);
		this.context.beginPath();
		this.context.arc(start[0], start[1], r, 0, 2 * Math.PI);
		this.context.stroke();
		this.context.closePath();
	}
}

export default DrawingUtils;
