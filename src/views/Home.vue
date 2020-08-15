<template>
  <main>
    <ListPokemon />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListPokemon from '@/components/ListPokemon.vue';

@Component({
  components: { ListPokemon },
})
export default class ViewPage extends Vue {}
</script>
