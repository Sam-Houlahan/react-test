import request from 'superagent'

export function getRepos (user) {
  return request
    .get(`https://api.github.com/users/${user}/repos`)
}
