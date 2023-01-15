/** 
 * *This is a React functional component that renders a simple text base game where a character 
 * *can catch Pokemons based on his trajectory. 
 * *The game is controlled by a string of moves ("N", "S", "E", "W") that the user can input.
 *
 * The component has a @handleMovement function that takes in a string of moves as an argument. 
 * It uses this string to calculate the new position of the character and fetch random Pokemon. 
 *
*/
//-----------------------------------------------------------------------------

// react
import React, { useState } from 'react';
// hooks
import { usePokemon } from '../../hooks/usePokemon';
//-----------------------------------------------------------------------------

interface TextCommandPokemonGameProps { }

export interface CharacterState {
  /**
    * Manage the state of the character, including its current position, 
    *  the number of caught Pokemon, and the Pokemons caught.
  */
  x: number,
  y: number,
  caughtPokemon: number,
  pokemons: any[]
  visitedHouses: Set<string>
}
//----------------------------------------------------------------

// Component
const TextCommandPokemonGame: React.FC<TextCommandPokemonGameProps> = (props) => {
  // Custom hooks
  const { catchMultipleRandomPokemons } = usePokemon()
  // React hooks
  const [charState, setCharState] = useState<CharacterState>({
    x: 0,
    y: 0,
    caughtPokemon: 0,
    pokemons: [],
    visitedHouses: new Set<string>()
  });
  const [sequence, setSequence] = useState("");
  //---------------------------------------------------------

  const handleMovement = async (sequence: string) => {
    // Initial values
    let caughtPokemon = 0;
    let visitedHouses = new Set<string>();
    let x = 0, y = 0;
    let currentPosition = `${x},${y}`;
    //Get pokemon from initial house
    visitedHouses.add(currentPosition);
    caughtPokemon++;

    // Loop through move sequence and update the initial values
    for (let move of sequence) {
      move = move.toUpperCase()
      console.log(visitedHouses)
      switch (move) {
        case "N":
          y = y + 1;
          break;
        case "S":
          y = y - 1;
          break;
        case "E":
          x = x + 1;
          break;
        case "W":
          x = x - 1;
          break;
        default:
          break;
      }

      //Set new position
      currentPosition = `${x},${y}`;
      if (visitedHouses.has(currentPosition)) {
        continue;
      }
      //Store position on the position Set
      visitedHouses.add(currentPosition);
      caughtPokemon++;
    }

    //fetch random pokemons from the custom hook
    const pokemons = await catchMultipleRandomPokemons(caughtPokemon, 151)
    //Update character state
    setCharState({
      x, y, caughtPokemon, visitedHouses, pokemons
    })
  }

  return (
    <div className="text-sm font-medium text-zinc-600 w-full flex flex-col items-center justify-center">
      {/* Command block */}
      <div className="container flex flex-col items-center" >
        <div className="flex items-end">
          <label className="text-sm font-medium text-zinc-600" >
            Sequence of moves:
            <input data-testid="sequence-input" className="block h-10 md:w-80 sm:w-72 px-2 rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " type="text" onChange={event => setSequence(event.target.value)} />
          </label>
          <button data-testid="move-button" className="bg-red-500 px-4 text-white rounded ml-2 h-10 flex items-center justify-center" onClick={() => handleMovement(sequence)} >Submit</button>
        </div>
        <div className="flex w-full md:gap-20 gap-10 justify-center my-2" >
        <p>Current position: X: {charState.x}, Y: {charState.y}</p>
        <p data-testid="caught-pokemons" className="" >Caught Pokemon: {charState.caughtPokemon}</p>
        </div>
  
        <p className="text-base font-semibold mb-2" >Pokemons:</p>
      </div>
      {/* Pokemon list */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 "  >
        {charState.pokemons.map((pkm) => (
          <div className="flex w-full items-center bg-emerald-500 rounded-lg p-2" >
            <img src={pkm.sprites.versions["generation-iii"].emerald.front_default} alt={pkm.name} />
            <div className="ml-2">
              <p className="capitalize font-bold" >{pkm.name}</p>
              {pkm.types.map((type: any, index:any) => (
                <p key={"type" + index} className="capitalize " >
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextCommandPokemonGame;
