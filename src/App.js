import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Rps from './component/rps'
import Host from './component/host'
import Join from './component/join'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/rps" component={Rps} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/join" component={Join} />
          <Route component={Rps} />
        </Switch>
      </Router>
    )
  }
}

export default App
