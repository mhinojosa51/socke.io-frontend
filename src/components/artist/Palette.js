import React from 'react';
import Color from './Color';

const styles = {
	container : {
		width: '100%',
		height: 'auto',
		display: 'flex',
	},
	label : {
		marginRight: '20px',
	}
}

class Palette extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selected : null,
		}

		this.selectColor = this.selectColor.bind(this);
	}

	selectColor(color){
		this.props.selectColor(color);
		this.setState({
			selected : color,
		})
	}

	render(){
		return (
			<section style={styles.container}>
				<h5 style={styles.label}>Stroke Color</h5>
				{this.props.colors.map((color,i) => {
					var selected = false;
					if(this.state.selected === color){
						selected = true
					}
					return <Color key={i} color={color} selected={selected} selectColor={this.selectColor}/>
				})}
			</section>
		)
	}
}

export default Palette;
