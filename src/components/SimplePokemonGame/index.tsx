/** 
 * *This is a React functional component that renders a simple game where a character 
 * *can move around a grid and catch Pokemons. 
 * *The game is controlled by a string of moves ("N", "S", "E", "W") that the user can input.
 *
 * The component has a @handleMovement function that takes in a string of moves as an argument. 
 * It uses this string to calculate the new position of the character, fetch random Pokemon, 
 * and animate the movement of the grid items.
 *
 * The component also has a @moveToNextPosition function that is called when the animation is complete.
 * It is used to move the character to the next position on the grid.
 *
 * The component also has a @moveGrid function that is used to animate the grid items. 
 * When the grid items move out of the visible area, the component should remove it from the grid 
 * and render it again on the opposite direction.
*/
//-----------------------------------------------------------------------------

// react
import React, { createRef, useRef, useState } from 'react';
// libraries
import { useSpring, animated } from 'react-spring';
// components & hooks
import { usePokemon } from '../../hooks/usePokemon';
// style & assets
import "./styles.css"
import house from "../../assets/House.png"
import charIdle from "../../assets/char_idle.png"
import charMoving from "../../assets/char_moving.png"
// constants
import { GRID_LENGTH, GRID_SIZE } from '../../constants';
//-----------------------------------------------------------------------------

interface SimplePokemonGameProps { }

export interface CharacterState {
  /**
   * Manage the state of the character, including its current position, 
   * whether it is moving or not, the number of caught Pokemon, 
   * and the Pokemons caught.
   */
  x: number,
  y: number,
  isMoving: boolean,
  caughtPokemon: number,
  pokemons: any[]
  visitedHouses: Set<string>
}
//-----------------------------------------------------------------------------
// array that will store the grid position to be used on the grid animation
let locationsArray = [] as any
// Character position offset: used to calculate character final position
const CHAR_OFFSET = {
  x: 200,
  y:200
}
//-----------------------------------------------------------------------------

// Component
const SimplePokemonGame: React.FC<SimplePokemonGameProps> = (props) => {
  // Custom hooks
  const { catchMultipleRandomPokemons } = usePokemon()
  // React hooks
  const itemRefs = useRef(Array.from({ length: GRID_LENGTH }, () => createRef<HTMLDivElement>()));
  const gridRef = useRef<HTMLDivElement>(null)
  const [sequence, setSequence] = useState("");
  const [gridPosition, SetGridPosition] = useState({ x: -100, y: -100 })
  const [charState, setCharState] = useState<CharacterState>({
    x: 0,
    y: 0,
    isMoving: false,
    caughtPokemon: 0,
    pokemons: [],
    visitedHouses: new Set<string>()
  });
  // Animation hooks
  const [gridProps, setGridProps] = useSpring(() => ({
    transform: "translate(-100%, -100%)",
    config: { mass: 1, tension: 280, friction: 120, duration: 200 },
    y: 0,
    onRest: () => {
      moveToNextPosition()
    }
  }));
  //---------------------------------------------------------

  const handleMovement = async (sequence: string) => {
    // Initial values
    let caughtPokemon = 0;
    locationsArray = []
    // a set with visited houses position
    let visitedHouses = new Set<string>();
    // set "x" and "y" based on current grid position
    let x = gridPosition.x, y = gridPosition.y;
    let currentPosition = `${x},${y}`;
    //Get pokemon from initial house
    visitedHouses.add(currentPosition);
    caughtPokemon++;

    // Loop through move sequence and update the initial values
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
          x = x - 100;
          break;
        case "W":
          x = x + 100;
          break;
        default:
          break;
      }

      // set new position
      currentPosition = `${x},${y}`;
      locationsArray.push({ x, y })

      if (visitedHouses.has(currentPosition)) {
        continue; // Skip
      }

      // store position on the position Set and increase number of caught pokemons
      visitedHouses.add(currentPosition);
      caughtPokemon++;
    } // End loop

    // start animation movement
    moveGrid(locationsArray[0].x, locationsArray[0].y)
    //fetch random pokemons from the custom hook
    const pokemons = await catchMultipleRandomPokemons(caughtPokemon, 151)
    //Update character state
    setCharState({
      x: x + CHAR_OFFSET.x, y: y + CHAR_OFFSET.y, isMoving: true, caughtPokemon, visitedHouses, pokemons
    })
  }

  const moveToNextPosition = () => {
    // Get the next position from the array
    // remove value from index 0
    locationsArray.shift();
    if (locationsArray.length === 0) {
      // If there are no more positions, stop the animation
      setCharState((char) => ({ ...char, isMoving: false }))
      return
    }
    moveGrid(locationsArray[0].x, locationsArray[0].y)
  }

  const moveGrid = (x: number, y: number) => {
    // update current grid position state
    SetGridPosition({ x, y });
    // update grid animation props
    setGridProps({
      transform: `translate(${x}%, ${y}%)`,
    });
    // grid position reference
    const rectGrid = gridRef.current ? gridRef.current.getBoundingClientRect() : null

    /**
     * Map through all grid elements (houses) references
     * When the grid item move out of the visible area it is rendered on the opposite direction
     */
    Array.from({ length: GRID_LENGTH }, (_, i) => i + 1).map((_, index) => {
      if (itemRefs.current[index].current && rectGrid) {
        //@ts-ignore ignoring index value
        const rect = itemRefs.current[index].current.getBoundingClientRect();

        if (rect.x - rectGrid.x < -100) {
          //@ts-ignore ignoring index value
          itemRefs.current[index].current.style.left = `${Number(itemRefs.current[index].current.style.left.slice(0, -1)) + 500}%`
          return
        }

        if (rect.x - rectGrid.x > 300) {
          //@ts-ignore ignoring index value
          itemRefs.current[index].current.style.left = `${Number(itemRefs.current[index].current.style.left.slice(0, -1)) - 500}%`
          return
        }

        if (rect.y - rectGrid.y < -100) {
          //@ts-ignore ignoring index value
          itemRefs.current[index].current.style.top = `${Number(itemRefs.current[index].current.style.top.slice(0, -1)) + 500}%`
          return
        }

        if (rect.y - rectGrid.y > 300) {
          //@ts-ignore ignoring index value
          itemRefs.current[index].current.style.top = `${Number(itemRefs.current[index].current.style.top.slice(0, -1)) - 500}%`
          return
        }
      }
    })
  }
  //---------------------------------------------------------

  return (
    <div className="text-sm font-medium text-zinc-600 w-full flex flex-col items-center justify-center">
      <div>
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
        <p data-testid="char-position" >Current position: X: {charState.x}, Y: {charState.y}</p>
        <p data-testid="caught-pokemons" className="" >Caught Pokemon: {charState.caughtPokemon}</p>
        </div>
       {/* Map */}
       <div id="outer_div" className={`relative w-[300px] h-[300px] overflow-hidden my-4`}>
          {/* Character */}
          <div className="absolute w-10 h-10 -ml-5 -mt-5 left-1/2 top-1/2 flex items-center justify-center" >
            <img src={charState.isMoving ? charMoving : charIdle} alt="Pkm Trainer" className="w-full h-full" />
          </div>
          {/* Grid Houses */}
          <animated.div ref={gridRef} className={`grid-container relative -z-10`}>
            {Array.from({ length: GRID_LENGTH }, (_, i) => i + 1).map((_, index) => (
              <animated.div
                ref={itemRefs.current[index]}
                id="item"
                className={`grid-item relative w-[100px] h-[100px] z-20 flex items-center justify-center bg-green-400`}
                style={{
                  transform: gridProps.transform,
                  left: "0%",
                  top: "0%",
                }}
                key={"row1" + index}>
                <img className="w-2/3 h-2/3 z-40" src={house} alt="house" />
              </animated.div>
            ))}
          </animated.div>
        </div>
      </div>
   
        <p className="text-base font-semibold mb-2 text-center" >Pokemons:</p>
      </div>
    {/* Pokemon list */}
    <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 "  >
        {charState.pokemons.map((pkm) => (
          <div key={pkm.id} className="flex w-full items-center bg-emerald-500 rounded-lg p-2" >
            <img src={pkm.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pkm.name} />
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

export default SimplePokemonGame;



