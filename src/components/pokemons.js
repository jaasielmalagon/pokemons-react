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

const Boton = styled.button`
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  border: none;
  background: #1766dc;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  transition: 0.3s ease all;
  &:hover {
    background: #0066ff;
  }
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
`;