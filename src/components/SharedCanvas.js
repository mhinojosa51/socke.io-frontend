import React from 'react';

const styles = {
	container : {
		width: '80%',
		height: '',
		border: '1px solid black',
	},
	canvas: {
		width: '100%',
		height: '100%',
	}
}

class SharedCanvas extends React.Component {
	constructor(props){
		super(props);

	}

	componentDidMount(){
		this.context = this.canvas.getContext('2d');
		this.context.strokeRect(5,5,5,5);

		this.context.beginPath();
		this.context.arc(50,50,50,0,(Math.PI / 180) * 360)
		this.context.stroke();


	}

	render(){

		const width = window.innerWidth - (window.innerWidth * .20);
		const height = window.innerHeight;
		return (
			<section style={styles.container}>
				<canvas ref={(canvas) => this.canvas = canvas} width={width} height={height}>
				</canvas>
			</section>
		)
	}
}

export default SharedCanvas;
