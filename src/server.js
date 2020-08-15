import { Server, Model } from 'miragejs';

function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    models: {
      pokemon: Model,
    },

    seeds(server) {
      server.create('pokemon', {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      });
      server.create('pokemon', {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      });
    },

    routes() {
      this.urlPrefix = 'https://pokeapi.co/api/v2';
      this.get('/pokemon', (schema) => ({ results: schema.db.pokemons }));
    },
  });
}

export default makeServer;
