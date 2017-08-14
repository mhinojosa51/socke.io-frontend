import React from 'react';
import UsersColumn from './UsersColumn';
import User from './User';

const styles = {
	container : {
		width: '100%',
		height: '100%',
		display: 'flex',
	}
}

class Dashboard extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div style={styles.container}>
				<UsersColumn>
					<User name="Mike" />
				</UsersColumn>
			</div>
		)
	}
}

export default Dashboard;
