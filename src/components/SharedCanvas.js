import React from 'react';
import Palette from './artist/Palette';

const styles = {
	container : {
		width: '80%',
		height: 'auto',
		border: '1px solid black',
	},
	canvas: {
		cursor: 'crosshair',
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
		const y = rect.top + evt.clientY - 40;

		this.state.drawing[this.state.drawing.length - 1].push([x,y])
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
			this.state.drawing.push([]);
		}
		this.setState({
			isDrawing : !this.state.isDrawing,
		})
	}

	draw(){
		this.state.drawing.map((path) => {
			this.context.beginPath();
			this.context.lineWidth = 10;
			path.map((vals) => {
				this.context.lineTo(vals[0],vals[1]);
			});
			this.context.strokeStyle = this.state.color;
			this.context.stroke();
			this.context.closePath();
		});
	}

	render(){
		const colors = ['yellow', 'blue', 'red', 'black', 'pink', 'steelblue', 'orange'];

		const width = window.innerWidth - (window.innerWidth * .20);
		const height = window.innerHeight;
		return (
			<section style={styles.container}>
				<Palette colors={colors} selectColor={this.selectColor}/>
				<canvas ref={(canvas) => this.canvas = canvas} onClick={this.canvasClick}
					onMouseDown={this.isDrawing} onMouseUp={() => {this.isDrawing(); this.draw()}} width={width} height={height}
					style={styles.canvas} onMouseMove={this.state.isDrawing ? this.canvasDrag : null}>
				</canvas>
			</section>
		)
	}
}

export default SharedCanvas;
