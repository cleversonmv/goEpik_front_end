import { createStore } from 'redux'
import rootReducer from '../configs/reducers'
import api from '../configs/api';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const store = createStore(rootReducer)

export const genderIcon = (gender) => (
  gender === 'male' ? "man" : (gender === 'female' ? "woman" : "setting")
);

export const clientApollo = new ApolloClient({
  link: api,
  cache: new InMemoryCache(),
});

export const trataLink = (link,type) =>  link.split(`/`)[5]+'/'

