import React from 'react'

import {getRepos} from '../api'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      repos: [],
      default: [],
      receive: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sortById = this.sortById.bind(this)
    this.sortByName = this.sortByName.bind(this)
    this.default = this.default.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    getRepos(this.state.userName, (err, res) => {
      if (err) return console.err
      this.setState({
        repos: res,
        default: res,
        received: true
      })
    })
  }

  sortById (repos) {
    const sortedIds = repos.map(repo => repo.id)
    sortedIds.sort((a, b) => b - a)
    const sortedRepos = sortedIds.map(id => repos.find(repo => id === repo.id))
    this.setState({
      repos: sortedRepos
    })
  }

  sortByName (repos) {
    const sortedNames = repos.map(repo => repo.name)
    sortedNames.sort((a, b) => a - b)
    const sortedRepos = sortedNames.map(name => repos.find(repo => name === repo.name))
    this.setState({
      repos: sortedRepos
    })
  }

  default () {
    this.setState({
      repos: this.state.default
    })
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    return (
      <div>
        <h1>Test</h1>
          {this.state.received &&
          <div className = 'buttons'>
          <button onClick={() => this.sortById(this.state.repos)}>Sort By Id </button>
          <button onClick={() => this.sortByName(this.state.repos)}>Sort By Name</button>
          <button onClick={() => this.default()}>Default</button>
          </div>
          }
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
