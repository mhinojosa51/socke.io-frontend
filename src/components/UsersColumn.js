import React from 'react';

const styles = {
	container : {
		minWidth: '300px',
		width: '20%',
		height: '100%',
		border: '1px solid #ff6600',
	}
}

class UsersColumn extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<section style={styles.container}>
				{this.props.children}
			</section>
		)
	}
}

export default UsersColumn;
