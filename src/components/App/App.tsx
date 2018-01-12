import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import './App.css'

const logo = require('../../resources/logo.svg')

class App extends Component<{ route: any }, {}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav className="App-nav">
            <Link to="/">Humans task</Link>
            <Link to="/posts">Posts</Link>
          </nav>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default App
