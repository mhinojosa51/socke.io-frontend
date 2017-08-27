import React from 'react';

let Color = ({color,selectColor}) => {

	let styles = {
		container : {
			width: '20px',
			height: '20px',
			cursor: 'pointer',
			backgroundColor: color,
		}
	}

	return (
		<div style={styles.container} onClick={() => selectColor(color)}>

		</div>
	)
}

export default Color;
