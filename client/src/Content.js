import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "./pages/Home"
import UserVote from "./pages/UserVote"
import NhlStandings from "./pages/NhlStandings"
import NhlSeries from "./pages/NhlSeries"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/userVote' component={UserVote}/>
      <Route exact path='/nhlStandings' component={NhlStandings}/>
      <Route exact path='/nhlSeries' component={NhlSeries}/>
    </Switch>
  </main>
)

export default Main
