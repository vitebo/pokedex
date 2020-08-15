import { shallowMount } from '@vue/test-utils';
import ListPokemon from '@/components/ListPokemon.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(ListPokemon);
    expect(wrapper.text()).toMatch('');
  });
});
