import React from 'react';
import SimplePokemonGame from './components/SimplePokemonGame';
import TextCommandPokemonGame from './components/TextCommandPokemonGame';
function App() {

  return (
    <div className="flex p-6" >
      <TextCommandPokemonGame/>
    </div>
  );
}

export default App;
