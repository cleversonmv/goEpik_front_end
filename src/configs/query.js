import gql from 'graphql-tag';
import { store } from '../components/utils';

export const getChars = async (client,args = "") => { 
  const query = gql`
    query getChars {
      chars(path: "${args}") @rest(type: "Chars", path: "people/?{args.path}") {
        results,
        next,
        previous,
        count
      }
  }`;
  await client.query({ query }).then(res => {
    store.dispatch({ type: 'SET_CHARS', payload: res.data.chars })
  });
}

export const getVehicle = async (client,args) => {

  const query = gql`
    query getChars {
      vehicle(path: "${args}") @rest(type: "Vehicle", path: "vehicles/{args.path}") {
        name
      }
  }`;
  return client.query({ query }).then(res => res.data.vehicle.name);
}
export const getSpecie = async (client,args) => {

  const query = gql`
    query getSpecie {
      specie(path: "${args}") @rest(type: "specie", path: "species/{args.path}") {
        name,
        language
      }
  }`;
  return client.query({ query }).then(res => res.data.specie);
}
