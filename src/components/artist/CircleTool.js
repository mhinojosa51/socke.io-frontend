import React from 'react';

const styles = {
	container : {
		width: '100%',
		height: 'auto',
		display: 'flex',
		marginTop: '20px',
		alignItems: 'center',
		cursor: 'pointer',
	},
	circleIcon : {
		width: '20px',
		height: '20px',
		borderRadius : '25px',
		border: '2px solid black',
		marginLeft: '10px',
	}
}

class CircleTool extends React.Component{

	constructor(props){
		super(props);
		this.selectTool = this.selectTool.bind(this);
	}

	selectTool(){
		this.props.selectTool('circle');
	}

	render(){
		return (
		<section style={styles.container} onClick={this.selectTool}>
			<h4>Draw Circle</h4>
			<div style={styles.circleIcon}></div>
		</section>
	)
	}
}

export default CircleTool;
