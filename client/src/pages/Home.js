import React from 'react'

import Vote from '../containers/Vote'

function Home(props) {
  return (
    <section className='globalLayout'>
      <Vote props={props} />
    </section>
  )
}

export default Home
