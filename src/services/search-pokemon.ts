import { pokeApi, routes } from '@/api/pokeApi';

interface DTO {
  id: string;
}

interface ServerResponse {
  id: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

interface ReturnSuccess {
  pokemon: {
    id: string;
    image: string | null;
  };
}

interface ReturnError {
  error: string;
}

type Return = Promise<ReturnSuccess | ReturnError>

async function searchPokemon({ id }: DTO): Return {
  try {
    const { data } = await pokeApi.get<ServerResponse>(routes.POKEMON(id));
    return {
      pokemon: {
        id,
        image: data.sprites.other['official-artwork'].front_default,
      },
    };
  } catch (e) {
    return ({ error: 'server\'s down' });
  }
}

export default searchPokemon;
