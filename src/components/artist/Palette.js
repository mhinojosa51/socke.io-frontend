import React from 'react';
import Color from './Color';

const styles = {
	container : {
		width: '100%',
		height: 'auto',
		display: 'flex',
	}
}

class Palette extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<section style={styles.container}>
				{this.props.colors.map((color,i) => {
					return <Color key={i} color={color} selectColor={this.props.selectColor}/>
				})}
			</section>
		)
	}
}

export default Palette;
