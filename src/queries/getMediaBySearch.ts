const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMwMjYyNjRhMzRiNzYxMDE0MjgxMjllMTIyMDhhZiIsInN1YiI6IjY0ZmUzNjVhMmRmZmQ4MDBhZGI2Nzk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.skFkc9-0tU6utxbezR4vGOZgm54xqmZo9dWU_uDEeGQ'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));