import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "./modal";

export const PokemonList = () => {
  const urlPokemons = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async (name, edad, fecha_nacimiento) => {
    await axios
      .get(urlPokemons)
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => {
        setPokemons([]);
        console.error(error);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Pokemons List</h1>
        <div className="row d-flex justify-content-between">
          {pokemons.map((pokemon, i) => (
            <div
              key={pokemon.name}
              className="col-2 my-1"
              style={{
                border: "1px solid white",
                borderRadius: "10px",
              }}
            >
              <p>{pokemon.name.toUpperCase()}</p>
              <p>
                <small>#{i + 1}</small>
              </p>
              <img
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  i + 1
                }.png`}
              ></img>
              <ContenedorBotones>
                <Modal
                  pokemonData={pokemon}
                ></Modal>
              </ContenedorBotones>
            </div>
          ))}
        </div>
      </div>
    </>
  );

};
const ContenedorBotones = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;