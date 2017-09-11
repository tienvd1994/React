import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">WebSiteName</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                  <li>
                    <IndexLink to="/">Home</IndexLink>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                  <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                </ul>
              </div>

            </div>
          </nav>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
