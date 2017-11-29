import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { memorize } from './lib/utils'

import Rps from './component/rock-paper-scissors'
import Host from './component/host'
import Join from './component/join'

class App extends Component {
  render() {
    memorize()

    return (
      <div className="App">
        <Router basename="peer-game">
          <Switch>
            <Route exact path="/rps" component={Rps} />
            <Route exact path="/host" component={Host} />
            <Route exact path="/join" component={Join} />
            <Redirect to="/rps" />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
