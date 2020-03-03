import React from 'react'

import Vote from '../containers/Vote'

function UserVote(props) {
  return (
    <section className='globalLayout'>
      <Vote props={props} />
    </section>
  )
}

export default UserVote
