<template>
  <div class="list-pokemon">
    <p class="list-pokemon__error" v-if="error">
      {{error}}
    </p>
    <ul class="list-pokemon__list" v-else>
      <li
        class="list-pokemon__item"
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import searchAllClassicPokemons from '@/services/search-all-classics-pokemons';

interface Pokemon {
  name: string;
  url: string;
}

@Component
export default class ListPokemon extends Vue {
  private pokemons: Array<Pokemon> = [];

  private error: string | null = null;

  async mounted(): Promise<void> {
    const data = await searchAllClassicPokemons();
    if ('error' in data) {
      this.handleError(data.error);
    } else {
      this.handleSuccess(data.pokemons);
    }
  }

  private handleSuccess(pokemons: Pokemon[]) {
    this.pokemons = pokemons;
  }

  private handleError(error: string) {
    this.error = error;
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
