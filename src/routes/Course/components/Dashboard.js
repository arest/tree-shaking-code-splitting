import React from 'react'
import {foo} from './helpers'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h3>Course Dashboard</h3>
        <p>{foo()}</p>
      </div>
    )
  }
}

export default Dashboard
