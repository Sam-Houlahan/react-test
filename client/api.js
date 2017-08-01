import request from 'superagent'

export function getRepos (userName) {
  return request
    .get(`https://api.github.com/users/${userName}/repos`)
}
