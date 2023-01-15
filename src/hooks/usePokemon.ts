/**
 * Custom hook used to retrieve pokemon data from PokeApi @see (https://pokeapi.co/)
 * The @catchMultipleRandomPokemons function takes in two arguments pokemons and pdxLimit. 
 * It creates an array of random numbers between 1 and pdxLimit with a length of pokemons 
 * and then uses the PokeAPI library to fetch Pokemon data by their ID. 
 *
 */
//------------------------------------------------------------------------------

// libraries
import * as PokeApi from 'pokeapi-js-wrapper';
//------------------------------------------------------------------------------

const customOptions = {
  cache: true,
  // cacheImages: true
}
const pokedex = new PokeApi.Pokedex(customOptions)

// functions
export const catchMultipleRandomPokemons = async (pokemons: number, pdxLimit=300) => {
  let pokemonIds = [];
  for (let i = 0; i < pokemons; i++) {
    pokemonIds.push(Math.floor(Math.random() * pdxLimit) + 1);
  }

  const data = await pokedex.getPokemonByName(pokemonIds);
  console.log("pokemons:", data)
  return data
}

// export hook
export const usePokemon = () => {
  return {
    pokedex,
    catchMultipleRandomPokemons
  }
}