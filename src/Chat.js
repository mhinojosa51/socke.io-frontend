import React from 'react';
import io from 'socket.io-client';

class Chat extends React.Component {
	constructor(props){
		super(props);

		this.socket = null;

	}

	componentDidMount(){
		this.socket = io('http://localhost:3000');

		console.log(this.socket);
		this.socket.emit('loaded', {'name' : 'Mike'});
	}

	render(){
		return (
			<div>

			</div>
		)
	}
}

export default Chat;
