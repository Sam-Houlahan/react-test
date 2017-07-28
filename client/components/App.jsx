import React from 'react'

import {getRepos} from '../api'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      error: '',
      repos: [],
      received: false,
      hidden: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSortById = this.handleSortById.bind(this)
    this.handleSortByName = this.handleSortByName.bind(this)
    this.handleDefault = this.handleDefault.bind(this)
    this.hideRepo = this.hideRepo.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    getRepos(this.state.userName)
    .then(res => {
      this.setState({
        repos: res.body,
        received: true,
        error: '',
        sortedRepos: null
      })
    })
    .catch(err => {
      this.setState({
        error: err
      })
    })
  }

  hideRepo (id) {
    this.setState({hidden: this.state.hidden.concat(id)})
  }

  handleSortById (repos) {
    const sortedRepos = repos.sort((a, b) => {
      return a.id == b.id ? 0 : +(a.id > b.id) || -1
    })
    this.setState({sortedRepos})
  }

  handleSortByName (repos) {
    const sortedRepos = repos.sort((a, b) => {
      return a.name.toLowerCase() == b.name.toLowerCase() ? 0 : +(a.name.toLowerCase() > b.name.toLowerCase()) || -1
    })
    this.setState({sortedRepos})
  }

  handleDefault () {
    this.setState({sortedRepos: null})
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render () {
    const repos = this.state.sortedRepos || this.state.repos
    const showingRepos = repos.filter(repo => !this.state.hidden.includes(repo.id))
    return (
      <div>
        <h2>Frisk Test</h2>
        {this.state.received &&
        <div className = 'buttons'>
          <button onClick={() => this.handleSortById(this.state.repos)}>Sort By Id </button>
          <button onClick={() => this.handleSortByName(this.state.repos)}>Sort By Name</button>
          <button onClick={() => this.handleDefault()}>Default Order</button>
        </div>}
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.error.message}</p>
          <input type='text' name='userName' onChange={this.handleChange} />
          <button>Load Repos </button>
        </form>
          <table className='repo-table'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
            {showingRepos.map(repo => {
              return (
                <tbody key={repo.id}>
                  <tr>
                    <td>{repo.id}</td>
                    <td>{repo.name}</td>
                    <td>{repo.description}</td>
                    <td>{repo.created_at}</td>
                    <td><button onClick={() => this.hideRepo(repo.id)}>Hide</button></td>
                  </tr>
                </tbody>
              )
            })}
          </table>
          <h4> Not showing {this.state.hidden.length} repos</h4>
      </div>
    )
  }
}

export default App
