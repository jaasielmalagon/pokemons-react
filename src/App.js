import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { PokemonList } from "./components/pokemons";
import { SearchInputByName } from "./components/searchDetailPokemon";
import "./styles/App.css";

export const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="" element={<PokemonList />}></Route>
            <Route path="/searchByName" element={<SearchInputByName />}></Route>
            <Route
              path="404"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
};
