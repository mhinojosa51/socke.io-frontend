import React from 'react';

const styles = {
	container : {
		width: '100%',
		borderTop: '1px solid #ff6600',
		borderBottom: '1px solid #ff6600',
		minHeight: '100px',
	}
}

let User = ({name}) => {
	return (
		<div style={styles.container}>
			<h3>{name}</h3>
		</div>
	)
}

export default User;
