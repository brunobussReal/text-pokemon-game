import React, { useState } from 'react';

interface TextCommandPokemonGameProps { }

export interface CharacterState {
  x: number,
  y: number,
  caughtPokemon: number,
  visitedHouses: Set<string>
}
//----------------------------------------------------------------

const TextCommandPokemonGame: React.FC<TextCommandPokemonGameProps> = (props) => {
  const [charState, setCharState] = useState<CharacterState>({
    x: 0,
    y: 0,
    caughtPokemon: 0,
    visitedHouses: new Set<string>()
  });
  const [sequence, setSequence] = useState("");

  const handleMovement = (sequence: string) => {
    let caughtPokemon = 0;
    let visitedHouses = new Set<string>();
    let x = 0, y = 0;
    let currentPosition = `${x},${y}`;

    //Get pokemon from initial house
    visitedHouses.add(currentPosition);
    caughtPokemon++;

    for (let move of sequence) {
      move = move.toUpperCase()
      switch (move) {
        case "N":
          y = y - 1;
          break;
        case "S":
          y = y + 1;
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

    //Update state
    setCharState({
      x, y, caughtPokemon, visitedHouses
    })
  }

  return (
    <div className="text-sm font-medium text-zinc-600 w-full flex items-center justify-center h-72">
      <div>
        <div className="flex items-end w-full">
          <label className="text-sm font-medium text-zinc-600" >
            Sequence of moves:
            <input className="block h-10 w-full px-2 rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " type="text" onChange={event => setSequence(event.target.value)} />
          </label>
          <button className="bg-red-500 px-4 text-white rounded ml-2 h-10 flex items-center justify-center" onClick={() => handleMovement(sequence)} >Submit</button>
        </div>
        <p>Current position: X: {charState.x}, Y: {charState.y}</p>
        <p>Caught Pokemon: {charState.caughtPokemon}</p>
      </div>
    </div>
  );
}

export default TextCommandPokemonGame;
