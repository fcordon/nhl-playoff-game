import React from 'react'

import Login from '../containers/Login'

function Home(props) {
  return (
    <section className='globalLayout'>
      <Login props={props} />
    </section>
  )
}

export default Home
