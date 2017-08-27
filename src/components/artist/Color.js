import React from 'react';

class Color extends React.Component {
	
	render(){
		let styles = {
			container : {
				width: '20px',
				height: '20px',
				cursor: 'pointer',
				backgroundColor: this.props.color,
				boxShadow: this.props.selected ? '0px 0px 10px #ff6600' : 'none',
			}
		}

		return (
			<div style={styles.container} onClick={() => {this.props.selectColor(this.props.color);}}>

			</div>
		)
	}
}

export default Color;
