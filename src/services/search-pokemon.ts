import { pokeApi, routes } from '@/api/poke-api';

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

interface Return {
  pokemon: {
    id: string;
    image: string | null;
  };
}

async function searchPokemon({ id }: DTO): Promise<Return> {
  return pokeApi.get<ServerResponse>(routes.POKEMON(id))
    .then(({ data }) => ({
      pokemon: {
        id,
        image: data.sprites.other['official-artwork'].front_default,
      },
    }))
    .catch(() => Promise.reject(new Error('server\'s down')));
}

export default searchPokemon;
