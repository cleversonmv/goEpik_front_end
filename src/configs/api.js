import { RestLink } from 'apollo-link-rest';

// const api = axios.create({
//   baseURL: 'https://swapi.co/api/'
// })
const api = new RestLink({
  uri: 'https://swapi.co/api/'
});

export default api;