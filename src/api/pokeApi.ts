import httpClient from '@/plugins/http-client';

const pokeApi = httpClient.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const routes = {
  ALL_POKEMONS: () => '/pokemon',
};

export { pokeApi, routes };
