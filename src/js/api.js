import fetch from 'isomorphic-fetch';

export function getIssues(nickname) {
  return fetch('https://api.github.com/users/' + nickname + '/repos')
    .then((r) => r.json())
  ;
}