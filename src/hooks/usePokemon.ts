import * as PokeApi from 'pokeapi-js-wrapper';

const customOptions = {
  cache: true,
  // cacheImages: true
}
const pokedex = new PokeApi.Pokedex(customOptions)

export const catchMultipleRandomPokemons = async (pokemons: number, pdxLimit=300) => {
  let pokemonIds = [];
  for (let i = 0; i < pokemons; i++) {
    pokemonIds.push(Math.floor(Math.random() * pdxLimit) + 1);
  }

  const data = await pokedex.getPokemonByName(pokemonIds);
  console.log("pokemons:", data)
  return data
}

export const usePokemon = () => {
  return {
    pokedex,
    catchMultipleRandomPokemons
  }
}