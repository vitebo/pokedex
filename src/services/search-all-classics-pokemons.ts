import { pokeApi, routes } from '@/api/poke-api';

interface Pokemon {
  name: string;
  url: string;
}

interface ServerResponse {
  results: Pokemon[];
}

interface Response {
  pokemons: Pokemon[];
}

const amountOfClassicPokemons = 151;

function searchAllClassicPokemons(): Promise<Response> {
  const params = {
    limit: amountOfClassicPokemons,
  };
  return pokeApi.get<ServerResponse>(routes.ALL_POKEMONS(), { params })
    .then(({ data }) => ({ pokemons: data.results }))
    .catch(() => Promise.reject(new Error('server\'s down')));
}

export default searchAllClassicPokemons;
