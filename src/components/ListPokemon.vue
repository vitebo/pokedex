<template>
  <ul class="list-pokemon">
    <li
      class="list-pokemon__item"
      v-for="pokemon in pokemons"
      :key="pokemon.name"
    >
      {{ pokemon.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

interface Pokemon {
  name: string;
  url: string;
}

interface Request {
  results: Array<Pokemon>;
}

@Component
export default class ListPokemon extends Vue {
  private pokemons: Array<Pokemon> = [];

  async mounted() {
    const { data } = await axios.get<Request>('https://pokeapi.co/api/v2/pokemon?limit=151');
    this.pokemons = data.results;
  }
}
</script>

<style scoped lang="scss">
$component-name: 'list-pokemon';

.#{$component-name} {
  position: relative;

  &__item {
    border: 1px solid #333;
  }
}
</style>
