import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reduxtools/store'

import Home from './containers/Home';
import About from './containers/About';
import Recipe from './containers/Recipe';

class App extends Component {
  componentDidMount = () => {
    // console.log("Loading from " + process.env.NODE_ENV + " Environment");
  }
  render() {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Provider store={store}>    
          <div className="App">
            {/* put components here if it need to appear on all pages */}
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/recipe/:id' component={Recipe} />
          </div>
        </Provider>
      </Router>      
    );
  }
}

export default App;
