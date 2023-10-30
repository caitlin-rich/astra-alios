const fetch = require('node-fetch');
import API_KEY
//I know this isn't right but I am too tired to fix it immediately.

const url = 'https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));