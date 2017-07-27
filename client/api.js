import request from 'superagent'

export function getRepos (user, callback) {
  request
    .get(`https://api.github.com/users/${user}/repos`)
    .end(function (err, res) {
      if (err) {
        callback(err)
      } else {
        callback(null, res.body)
      }
    })
}
