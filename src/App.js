import React from 'react'
import { PokemonList } from './components/pokemons';
import "./styles/App.css";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <><PokemonList /></>
      </header>
    </div>
  );

  
}
