import React from 'react';
import Palette from './Palette';

const styles = {
	container : {
		width: '100%',
		height: 'auto',
		padding: '0px 0px 20px 0px',
		display: 'flex',
		flexDirection: 'column',
	}
}

class Artist extends React.Component {

	render(){
		const colors = ['yellow', 'blue', 'red', 'black', 'pink', 'steelblue', 'orange'];
		return (
			<section style={styles.container}>
				<h4>Michael</h4>
				<Palette colors={colors} selectColor={this.props.selectColor}/>
			</section>
		)
	}
}

export default Artist;
