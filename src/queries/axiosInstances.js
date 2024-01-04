
import axios from 'axios'
const {REACT_APP_TMDB_API_KEY} = process.env

export const axiosGet = axios.create({
    method: 'get',
    baseURL: `https://api.themoviedb.org`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${REACT_APP_TMDB_API_KEY}`
    },
  })