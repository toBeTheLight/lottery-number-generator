import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Types, SevenStar, DoubleChromosphere } from '../index.js'
import './app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Types}/>
          <Route path="/types/seven-star" component={SevenStar} />
          <Route path="/types/double-chromosphere" component={DoubleChromosphere} />
        </Switch>
      </Router>        
    );
  }
}

export default App;
