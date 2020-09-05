/* eslint-disable @typescript-eslint/camelcase */
import { Server, Model } from 'miragejs';

function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    models: {
      pokemon: Model,
    },

    seeds(server) {
      server.create('pokemon', {
        id: 1,
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        sprites: {
          other: {
            dream_world: {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
              front_female: null,
            },
            'official-artwork': {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            },
          },
        },
      });
      server.create('pokemon', {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
        sprites: {
          other: {
            dream_world: {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
              front_female: null,
            },
            'official-artwork': {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
            },
          },
        },
      });
    },

    routes() {
      this.urlPrefix = 'https://pokeapi.co/api/v2';

      this.get('/pokemon', (schema) => {
        const results = schema.db.pokemons.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
        }));
        return { results };
      });

      this.get('/pokemon/:name/', (schema, request) => {
        const { name } = request.params;
        const { attrs } = schema.pokemons.findBy({ name });
        return {
          name: attrs.name,
          sprites: {
            other: {
              dream_world: {
                front_default: attrs.sprites.other.dream_world.front_default,
                front_female: attrs.sprites.other.dream_world.front_female,
              },
              'official-artwork': {
                front_default: attrs.sprites.other['official-artwork'].front_default,
              },
            },
          },
        };
      });
    },
  });
}

export default makeServer;
