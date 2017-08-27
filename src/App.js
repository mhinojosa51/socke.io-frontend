import React, { Component } from 'react';
import './App.css';
import Chat from './Chat';
//import Dashboard from './components/Dashboard';
import SharedCanvas from './components/SharedCanvas';

class App extends Component {
  render() {
    return (
				<SharedCanvas />
    );
  }
}

export default App;
