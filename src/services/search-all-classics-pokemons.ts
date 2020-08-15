import httpClient from '@/plugins/http-client';

interface Pokemon {
  name: string;
  url: string;
}

interface ServerResponse {
  results: Pokemon[];
}

interface ReturnSuccess {
  pokemons: Pokemon[];
}

interface ReturnError {
  error: string;
}

type Return = Promise<ReturnSuccess | ReturnError>

const URL = 'https://pokeapi.co/api/v2/pokemon';

async function searchAllClassicPokemons(): Return {
  try {
    const { data } = await httpClient.get<ServerResponse>(URL, {
      params: {
        limit: 151,
      },
    });
    return { pokemons: data.results };
  } catch (e) {
    return ({ error: 'server down' });
  }
}

export default searchAllClassicPokemons;
