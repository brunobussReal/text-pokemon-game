import React, { useEffect, useState } from 'react';
import * as PokeApi from 'pokeapi-js-wrapper';
import { usePokemon } from '../../hooks/usePokemon';
import { useSpring, animated } from 'react-spring';

interface SimplePokemonGameProps { }

export interface CharacterState {
  x: number,
  y: number,
  caughtPokemon: number,
  pokemons: any[]
  visitedHouses: Set<string>
}
//----------------------------------------------------------------
let locationsArray = [] as any

const SimplePokemonGame: React.FC<SimplePokemonGameProps> = (props) => {
  const [charState, setCharState] = useState<CharacterState>({
    x: 0,
    y: 0,
    caughtPokemon: 0,
    pokemons: [],
    visitedHouses: new Set<string>()
  });
  const [sequence, setSequence] = useState("");
  const { catchMultipleRandomPokemons } = usePokemon()

  const [animationProps, setAnimationProps] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 280, friction: 120, duration: 200 },
    onRest: () => {
      moveToNextPosition()
    }
  }));

  const handleMovement = async (sequence: string) => {
    let caughtPokemon = 0;
    let visitedHouses = new Set<string>();
    let x = 0, y = 0;
    let currentPosition = `${x},${y}`;
    locationsArray = []
    //Get pokemon from initial house
    visitedHouses.add(currentPosition);
    // locationsArray.push({ x, y })
    caughtPokemon++;

    for (let move of sequence) {
      move = move.toUpperCase()
      switch (move) {
        case "N":
          y = y + 100;
          break;
        case "S":
          y = y - 100;
          break;
        case "E":
          x = x + 100;
          break;
        case "W":
          x = x - 100;
          break;
        default:
          break;
      }

      //Set new position
      currentPosition = `${x},${y}`;
      locationsArray.push({ x, y })

      if (visitedHouses.has(currentPosition)) {
        continue;
      }

      //Store position on the position Set and Increase number of caught pokemons
      visitedHouses.add(currentPosition);
      caughtPokemon++;
    }

    // start animation movement
    setAnimationProps({ x: locationsArray[0].x, y: locationsArray[0].y });
    //fetch random pokemons
    const pokemons = await catchMultipleRandomPokemons(caughtPokemon, 151)
    //Update character state
    setCharState({
      x, y, caughtPokemon, visitedHouses, pokemons
    })
  }

  const moveToNextPosition = () => {
    // Get the next position from the array
    locationsArray.shift();
    if (locationsArray.length === 0) return; // If there are no more positions, stop the animation
    setAnimationProps({ x: locationsArray[0].x, y: locationsArray[0].y });
  }

  return (
    <div className="text-sm font-medium text-zinc-600 w-full flex flex-col items-center justify-center">
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
        <div className="w-full bg-green-600 h-72">
          <animated.div style={animationProps}>
            Ash
          </animated.div>
        </div>
        <p className="text-base font-semibold mb-2" >Pokemons:</p>
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 "  >
        {charState.pokemons.map((pkm, index) => (
          <div key={pkm.id + index} className="flex w-full items-center" >
            <img src={pkm.sprites.versions["generation-iii"].emerald.front_default} alt={pkm.name} />
            <div className="ml-2">
              <p className="capitalize font-bold" >{pkm.name}</p>
              {pkm.types.map((type: any) => (
                <p key={type.type.name} >
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

export default SimplePokemonGame;
