import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { Types } from '../index.js'
import './app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Types}/>
      </Router>        
    );
  }
}

export default App;
