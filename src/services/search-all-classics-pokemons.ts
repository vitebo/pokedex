import { pokeApi, routes } from '@/api/pokeApi';

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

const amountOfClassicPokemons = 151;

async function searchAllClassicPokemons(): Return {
  try {
    const { data } = await pokeApi.get<ServerResponse>(routes.ALL_POKEMONS(), {
      params: {
        limit: amountOfClassicPokemons,
      },
    });
    return { pokemons: data.results };
  } catch (e) {
    return ({ error: 'server\'s down' });
  }
}

export default searchAllClassicPokemons;
