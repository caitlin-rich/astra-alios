
import axios from 'axios'
import rateLimit from 'axios-rate-limit';
const {REACT_APP_TMDB_API_KEY} = process.env

export const axiosGet = rateLimit(axios.create({
    method: 'get',
    baseURL: `https://api.themoviedb.org`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${REACT_APP_TMDB_API_KEY}`
    },
  }), {maxRequests: 40, perMilliseconds: 1000})