import React, { useState } from 'react';

interface PokemonGameProps { }

interface CharacterState {
  x: number,
  y: number,
  caughtPokemon: number,
  visitedHouses: Set<string>
}

const PokemonGame: React.FC<PokemonGameProps> = (props) => {
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

    for (let move of sequence) {
      move = move.toUpperCase()
      console.log(visitedHouses)
      let currentPosition = `${x},${y}`;
      if (visitedHouses.has(currentPosition)) {
        continue;
      }

      visitedHouses.add(currentPosition);
      caughtPokemon++;
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
    }}

    setCharState({
      x,
      y,
      caughtPokemon,
      visitedHouses
    })
  }

  return (
    <div>
        <label>
          Sequence of moves:
          <input type="text" onChange={event => setSequence(event.target.value)} />
        </label>
        <input type="submit" onClick={() => handleMovement(sequence)} />
      <p>Current position: X: {charState.x}, Y: {charState.y}</p>
      <p>Caught Pokemon: {charState.caughtPokemon}</p>
      <p>
        {charState.visitedHouses.has(`${charState.x},${charState.y}`)
          ? "No Pokemon here. Ash already caught one here"
          : "There is a Pokemon here"}
      </p>
    </div>
  );
}

export default PokemonGame;
