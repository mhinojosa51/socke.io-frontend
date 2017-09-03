class DrawingUtils {

	constructor(){
		this.isDrawing = false;
		this.drawMode = "line";
		this.mouseStartPos = [];
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDrag = this.onMouseDrag.bind(this);
		this.draw = this.draw.bind(this);
		this.drawings = [];
		this.saveDrawing = this.saveDrawing.bind(this);
		this.recreate = this.recreate.bind(this);
		this.lines = [];
		this.currentLine = [];
		this.drawLine = this.drawLine.bind(this);
		this.drawCircle = this.drawCircle.bind(this);
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
		if(this.drawMode === 'circle'){
			let drawing = {pos,r};
			this.drawings.push(drawing);
		} else {
			let drawing = {
				points : this.currentLine,
			};

			this.drawings.push(drawing);
			this.currentLine = [];
		}
	}

	recreate(){
		for(let i = 0; i < this.drawings.length; i++){
			let drawing = this.drawings[i];
			this.context.beginPath();

			if(drawing.hasOwnProperty('r')){
				this.context.arc(drawing.pos[0], drawing.pos[1], drawing.r, 0, 2 * Math.PI);
			} else {
				drawing.points.map((point) => {
					this.context.lineTo(point[0],point[1]);
					return null;
				});
			}
			this.context.stroke();
			this.context.closePath();
		}
	}

	drawLine(x,y){
		this.currentLine.push([x,y]);
		this.context.beginPath();
		this.currentLine.map((point) => {
			this.context.lineTo(point[0],point[1]);
			return null;
		});
		this.context.stroke();
		this.context.closePath();
	}

	drawCircle(x,y,r){
		this.context.beginPath();
		this.context.arc(x,y, r, 0, 2 * Math.PI);

		this.context.stroke();
		this.context.closePath();
	}

	draw(start,end){
		let r = Math.abs(start[0] - end[0]);
		switch(this.drawMode){
			case 'circle':
				this.drawCircle(start[0],start[1],r);
				break;

			case 'line':
				this.drawLine(end[0],end[1]);
				break;

			default:
				return null;
		}

		if(!this.isDrawing){
			let pos = start;
			this.saveDrawing(pos,r);
		}

	}
}

export default DrawingUtils;
