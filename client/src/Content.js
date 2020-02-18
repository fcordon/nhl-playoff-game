import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "./pages/Home"
import NhlStandings from "./pages/NhlStandings"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/nhlStandings' component={NhlStandings}/>
    </Switch>
  </main>
)

export default Main
