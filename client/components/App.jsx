import React from 'react'

import {getRepos} from '../api'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <h1>Test</h1>
        <form>
          <input type='text' name='userName' onChange={this.handleChange} />
          <button>submit </button>
        </form>
      </div>
    )
  }
}

export default App
