import React from 'react'

import AppBar from './AppBar'
import Content from './Content'

const App = (props) => {
  return (
    <section className='App'>
      <AppBar history={props.history} />
      <Content />
    </section>
  );
}

export default App;
