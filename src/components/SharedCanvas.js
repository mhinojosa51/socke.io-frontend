import React from 'react';
import UsersColumn from './UsersColumn';
import Artist from './artist/Artist';

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
		}

		this.canvasClick = this.canvasClick.bind(this);
		this.canvasDrag = this.canvasDrag.bind(this);
		this.isDrawing = this.isDrawing.bind(this);
		this.draw = this.draw.bind(this);
		this.selectColor = this.selectColor.bind(this);
	}

	componentDidMount(){
		this.context = this.canvas.getContext('2d');
	}

	selectColor(color){
		this.setState({color});
	}

	canvasClick(evt){
		const rect = this.canvas.getBoundingClientRect();

		const x = rect.left + evt.clientX;
		const y = rect.top + evt.clientY;

		this.state.drawing[this.state.drawing.length - 1].points.push([x,y])
/*
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
				<canvas ref={(canvas) => this.canvas = canvas} onClick={this.canvasClick}
					onMouseDown={this.isDrawing} onMouseUp={() => {this.isDrawing(); this.draw()}} width={width} height={height}
					style={styles.canvas} onMouseMove={this.state.isDrawing ? this.canvasDrag : null}>
				</canvas>
				<UsersColumn>
					<Artist canvas={this.canvas} selectColor={this.selectColor}/>
				</UsersColumn>
			</section>
		)
	}
}

export default SharedCanvas;
