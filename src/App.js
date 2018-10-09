import React, { Component } from 'react';
import update from 'react-addons-update';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Test_1 from './components/Test_1';
import Test_2 from './components/Test_2';
import Home from './components/Home';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <div className="App-header py-4 text-center">
          <a href="/" className="d-inline-block logo__link">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="quiz__name">QUIZ</h1>
          </a>
        </div>
        <Router>
          <div className="container pt-0 mt-2">
            <div className="row">
              <div className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Головна</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/test-1">Модальність</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/test-2">БІАС-тест</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <Route exact path="/" component={Home} />
              <Route path="/test-1" component={Test_1} />
              <Route path="/test-2" component={Test_2} />
            </div>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
