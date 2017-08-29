import React from 'react';
import UsersColumn from './UsersColumn';
import Artist from './artist/Artist';
import DrawingUtils from '../utils/DrawingUtils';

const styles = {
	container : {
		width: '100%',
		height: '100%',
		border: '1px solid black',
		display: 'flex',
	},
	canvas: {
		cursor: 'crosshair',
		width: '80%',
	}
}

class SharedCanvas extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isDrawing : false,
			drawing : [],
			color: 'black',
			tool: 'circle',
		}

		this.canvasClick = this.canvasClick.bind(this);
		this.canvasDrag = this.canvasDrag.bind(this);
		this.isDrawing = this.isDrawing.bind(this);
		this.draw = this.draw.bind(this);
		this.selectColor = this.selectColor.bind(this);
		this.drawCircle = this.drawCircle.bind(this);
		this.selectTool = this.selectTool.bind(this);
		this.DrawingUtils = new DrawingUtils();

		this.prevX = 0;
		this.prevY = 0;
		this.currX = 0;
		this.currY = 0;
	}

	componentDidMount(){
		this.context = this.canvas.getContext('2d');
		this.DrawingUtils.setCanvasAndContext(this.canvas);
	}

	selectColor(color){
		this.setState({color});
	}

	canvasClick(evt){
		const rect = this.canvas.getBoundingClientRect();
		this.prevX = this.currX;
		this.prevY = this.currY;
		this.currX = rect.left + evt.clientX;
		this.currY = rect.top + evt.clientY;

		if(this.state.tool === 'circle'){
			this.drawCircle(this.currX,this.currY,this.prevX, this.prevY,5, this.state.isDrawing)
		}
		else {
			this.state.drawing[this.state.drawing.length - 1].points.push([this.currX,this.currY])

		}
/*vY,
		if(this.state.isDrawing){
			this.context.beginPath();
			this.context.lineTo(x - 7.5,y - 7.5);
		}
		this.context.lineTo(x - 7.5,y - 7.5);
		this.context.stroke(); */
	}

	canvasDrag(evt){
		this.canvasClick(evt);
		this.draw();
	}

	isDrawing(){
		if(this.state.isDrawing === false){
			this.state.drawing.push({
				color: this.state.color,
				points: [],
			});
		}
		this.setState({
			isDrawing : !this.state.isDrawing,
		})
	}

	selectTool(tool){
		this.setState({
			tool,
		})
	}

	drawCircle(x,y,pX,pY,r,drawing){
		console.log(x-pX)
		this.context.beginPath();
		this.context.arc(x,y,Math.abs(x-pX),0,2 * Math.PI);

		if(drawing === false){
			this.context.stroke();
			this.context.closePath();
		}

console.log(x,pX)
	}

	draw(){
		this.state.drawing.map((path) => {
			this.context.beginPath();
			this.context.lineWidth = 10;
			path.points.map((vals) => {
				this.context.lineTo(vals[0],vals[1]);
				return null;
			});
			this.context.strokeStyle = path.color;
			this.context.stroke();
			this.context.closePath();
			return null;
		});
	}

	render(){

		const width = window.innerWidth - (window.innerWidth * .20);
		const height = window.innerHeight;
		return (
			<section style={styles.container}>
				<canvas ref={(canvas) => this.canvas = canvas} width={width} height={height} style={styles.canvas}
					onMouseDown={this.DrawingUtils ? this.DrawingUtils.onMouseDown : null} onMouseUp={this.DrawingUtils.onMouseUp}
					onMouseMove={this.DrawingUtils.onMouseDrag}>
				</canvas>
				<UsersColumn>
					<Artist canvas={this.canvas} selectColor={this.selectColor} selectTool={this.selectTool}/>
				</UsersColumn>
			</section>
		)
	}
}

export default SharedCanvas;
