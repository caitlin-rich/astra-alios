const {REACT_APP_TMDB_API_KEY} = process.env

const getMediaBySearch = (searchTerm: string) => {

  const url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${REACT_APP_TMDB_API_KEY}`
    }
  };

  const response = fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

  console.log('testing', response)
  return response
}

export default getMediaBySearch
