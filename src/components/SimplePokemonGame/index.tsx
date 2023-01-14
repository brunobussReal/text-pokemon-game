import React, { createRef, useEffect, useRef, useState } from 'react';
import * as PokeApi from 'pokeapi-js-wrapper';
import { usePokemon } from '../../hooks/usePokemon';
import { useSpring, animated } from 'react-spring';
import "./styles.css"
import house from "../../assets/House.png"

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
  const itemRefs = useRef(Array.from({ length: 25 }, () => createRef<HTMLDivElement>()));
  const gridRef = useRef<HTMLDivElement>(null)
  const [animationProps, setAnimationProps] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 280, friction: 120, duration: 200 },
    onRest: () => {
      moveToNextPosition()
    }
  }));

  const [gridPosition, SetGridPosition] = useState({ x: -100, y: -100 })

  const [gridProps, setGridProps] = useSpring(() => ({
    transform: "translate(-100%, -100%)",
    config: { mass: 1, tension: 280, friction: 120, duration: 200 },
    y: 0,
    onRest: () => {
      moveToNextPosition()
    }
  }));

  const handleMovement = async (sequence: string) => {
    let caughtPokemon = 0;
    let visitedHouses = new Set<string>();
    let x = gridPosition.x, y = gridPosition.y;
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
    // setAnimationProps({ x: locationsArray[0].x, y: locationsArray[0].y });
    setGridProps({
      transform: `translate(${locationsArray[0].x}%, ${locationsArray[0].y}%)`,
    });
    //fetch random pokemons
    // const pokemons = await catchMultipleRandomPokemons(caughtPokemon, 151)
    //Update character state
    setCharState({
      x, y, caughtPokemon, visitedHouses, pokemons: []
    })
  }

  const moveToNextPosition = () => {
    // Get the next position from the array
    locationsArray.shift();
    if (locationsArray.length === 0) return; // If there are no more positions, stop the animation
    // setAnimationProps({ x: locationsArray[0].x, y: locationsArray[0].y });
    moveGrid(locationsArray[0].x, locationsArray[0].y)
  }

  const moveGrid = (x: number, y: number) => {
    SetGridPosition({ x, y });
    setGridProps({
      transform: `translate(${x}%, ${y}%)`,
    });

    const rectGrid = gridRef.current ? gridRef.current.getBoundingClientRect() : null

    Array.from({ length: 25 }, (_, i) => i + 1).map((_, index) => {
      if (itemRefs.current[index].current && rectGrid) {
        //@ts-ignore
        const rect = itemRefs.current[index].current.getBoundingClientRect();
        // console.log(rect.left, rect.top, rect.right, rect.bottom, {x:rect.x}, {y:rect.y})

        if (rect.x -  rectGrid.x < -100) {
          //@ts-ignore
          itemRefs.current[index].current.style.left = `${Number(itemRefs.current[index].current.style.left.slice(0, -1)) + 500}%`
          return
        }

        if (rect.x - rectGrid.x > 300) {
          //@ts-ignore
          itemRefs.current[index].current.style.left = `${Number(itemRefs.current[index].current.style.left.slice(0, -1)) - 500}%`
          return
        }

        if (rect.y - rectGrid.y < -100) {
          //@ts-ignore
          itemRefs.current[index].current.style.top = `${Number(itemRefs.current[index].current.style.top.slice(0, -1)) + 500}%`
          return
        }

        if (rect.y - rectGrid.y > 300) {
          //@ts-ignore
          itemRefs.current[index].current.style.top = `${Number(itemRefs.current[index].current.style.top.slice(0, -1)) - 500}%`
          return
        }
      }
    })
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

        <button className="m-2" onClick={() => moveGrid(gridPosition.x - 100, gridPosition.y)}>Move Left</button>
        <button className="m-2" onClick={() => moveGrid(gridPosition.x + 100, gridPosition.y)}>Move Right</button>
        <button className="m-2" onClick={() => moveGrid(gridPosition.x, gridPosition.y - 100)}>Move Up</button>
        <button className="m-2" onClick={() => moveGrid(gridPosition.x, gridPosition.y + 100)}>Move Down</button>
        <div id="outer_div" className="relative w-[300px] h-[300px] overflow-hidden">
          <div ref={gridRef} className="grid-container relative -z-10 w-[500px] h-[500px]  ">
            {Array.from({ length: 25 }, (_, i) => i + 1).map((n, index) => (
              <animated.div
                ref={itemRefs.current[index]}
                id="item"
                className={`grid-item relative w-[100px] h-[100px] z-20 flex items-center justify-center bg-green-400`}
                style={{
                  transform: gridProps.transform,
                  left: "0%",
                  top: "0%",
                  backgroundColor: n === 2 ? "gray" : "bg-green-400"
                }}
                key={"row1" + n}>
                <img className="w-2/3 h-2/3" src={house} alt="house" />
              </animated.div>
            ))}
          </div>
        </div>
        <p className="text-base font-semibold mb-2" >Pokemons:</p>
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 "  >
        {charState.pokemons.map((pkm, index) => (
          <div key={"pkm" + index} className="flex w-full items-center" >
            <img src={pkm.sprites.versions["generation-iii"].emerald.front_default} alt={pkm.name} />
            <div className="ml-2">
              <p className="capitalize font-bold" >{pkm.name}</p>
              {pkm.types.map((type: any) => (
                <p key={`${pkm.id}${type.type.name}`} >
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


