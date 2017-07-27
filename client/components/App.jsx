import React from 'react'

import {getRepos} from '../api'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      repos: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sortById = this.sortById.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    getRepos(this.state.userName, (err, res) => {
      if (err) return console.err
      this.setState({
        repos: res
      })
    })
  }

  sortById (repos) {
    const sortedIds = repos.map(repo => {
      return repo.id
    })
    sortedIds.sort(function(a, b) {
      return b - a
    })
    //  this.setState({
    //    repos: newRepos
    //  })
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    console.log(this.sortById(this.state.repos))
    return (
      <div>
        <h1>Test</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='userName' onChange={this.handleChange} />
          <button>Load Repos </button>
          <table className='repo-table'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
            {this.state.repos.map((repo, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>{repo.id}</td>
                    <td>{repo.name}</td>
                    <td>{repo.description}</td>
                    <td>{repo.created_at}</td>
                  </tr>
              </tbody>
              )
            })}
          </table>
        </form>
      </div>
    )
  }
}

export default App
