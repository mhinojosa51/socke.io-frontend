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

		this.canvasClick = this.canvasClick.bind(this);
	}

	componentDidMount(){
		this.context = this.canvas.getContext('2d');

	}

	canvasClick(evt){
		const rect = this.canvas.getBoundingClientRect();

		const x = rect.left + evt.clientX;
		const y = rect.top + evt.clientY;

		this.context.strokeRect(x - 7.5,y - 7.5,10,10);
	}

	render(){

		const width = window.innerWidth - (window.innerWidth * .20);
		const height = window.innerHeight;
		return (
			<section style={styles.container}>
				<canvas ref={(canvas) => this.canvas = canvas} onClick={this.canvasClick} width={width} height={height} style={styles.canvas}>
				</canvas>
			</section>
		)
	}
}

export default SharedCanvas;
