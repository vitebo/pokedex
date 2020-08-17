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
        <button
          class="list-pokemon__button"
          :class="{
            'list-pokemon__button--selected': isTheSelectedPokemon(pokemon)
          }"
          @click="selectPokemon(pokemon.name)"
        >
          {{ pokemon.name }}
        </button>
      </li>
    </ul>
    <figure
      class="list-pokemon__figure"
      v-if="selectedPokemon"
    >
      <img :src="selectedPokemon.image">
    </figure>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import searchAllClassicPokemons from '@/services/search-all-classics-pokemons';
import searchPokemon from '@/services/search-pokemon';

interface PokemonListItem {
  name: string;
  url: string;
}

interface SelectedPokemon {
  image: string | null;
  name: string;
}

@Component
export default class ListPokemon extends Vue {
  pokemons: Array<PokemonListItem> = [];

  error: string | null = null;

  selectedPokemon: SelectedPokemon | null = null;

  mounted(): void {
    this.setupPokemons();
  }

  async setupPokemons(): Promise<void> {
    const data = await searchAllClassicPokemons();
    if ('error' in data) {
      this.error = data.error;
    } else {
      this.pokemons = data.pokemons;
      const [pokemon] = this.pokemons;
      this.selectPokemon(String(pokemon.name));
    }
  }

  async selectPokemon(name: string) {
    const data = await searchPokemon({ id: name });
    if ('error' in data) {
      this.error = data.error;
    } else {
      const pokemon = {
        ...data.pokemon,
        name,
      };
      this.selectedPokemon = pokemon;
    }
  }

  isTheSelectedPokemon(pokemon: PokemonListItem) {
    if (this.selectedPokemon) {
      return this.selectedPokemon.name === pokemon.name;
    }
    return false;
  }
}
</script>

<style scoped lang="scss">
$component-name: 'list-pokemon';

.#{$component-name} {
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    max-width: 800px;
    padding: 0;
    position: relative;
  }

  &__item {
    flex-basis: 40%;
    flex-grow: 1;
    margin: 16px;
    max-width: 40%;
  }

  &__button {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 8px 16px;
    text-align: left;
    white-space: nowrap;
    width: 100%;

    &--selected {
      background-color: #5dc1cf;
    }
  }

  &__figure {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    display: block;
    margin: 24px;
    min-height: 280px;
    min-width: 280px;
    position: fixed;
    right: 0;
    top: 0;
  }
}
</style>
