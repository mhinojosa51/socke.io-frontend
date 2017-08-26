import React from 'react';

const styles = {
	container : {
		width: '80%',
		height: '',
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
		}

		this.canvasClick = this.canvasClick.bind(this);
		this.canvasDrag = this.canvasDrag.bind(this);
		this.isDrawing = this.isDrawing.bind(this);
		this.draw = this.draw.bind(this);
	}

	componentDidMount(){
		this.context = this.canvas.getContext('2d');

	}

	canvasClick(evt){
		const rect = this.canvas.getBoundingClientRect();

		const x = rect.left + evt.clientX;
		const y = rect.top + evt.clientY;

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
			path.map((vals) => {
				this.context.lineTo(vals[0],vals[1]);
			});
			this.context.stroke();
			this.context.closePath();
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
			</section>
		)
	}
}

export default SharedCanvas;
