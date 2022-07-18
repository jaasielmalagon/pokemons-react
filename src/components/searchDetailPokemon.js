import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const SearchInput = ({ pokemonData }) => {
  const [estadoPokemons, cambiarEstadoPokemons] = useState([]);
  const [estadoSearch, cambiarEstadoSearch] = useState([]);

  useEffect(() => {
    // getPokemon();
  }, []);

  const getPokemon = async () => {
    const pokemon = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${estadoSearch}`)
      .then((response) => {
        console.log(response);
        let pokemons = response.data;
        cambiarEstadoPokemons(pokemons);
      })
      .catch((error) => {
        console.error(error);
        cambiarEstadoPokemons([]);
      });
    return pokemon;
  };

  return (
    <>
      <div className="container container-md container-lg">
        <div className="row w-100">
          <div className="col-12">
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
              }}
            >
              <div className="row g-0 align-items-center">
                <div className="col-5 offset-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    value={estadoSearch}
                    onChange={(evt) => {
                      cambiarEstadoSearch(evt.target.value);
                    }}
                  />
                </div>
                <div className="col-2">
                  <Boton onClick={() => getPokemon()}>Buscar</Boton>
                </div>
              </div>
            </form>
          </div>
        </div>
        {estadoPokemons && (
          <div className="row g-0 mb-5" style={{color: "white"}}>
            <div className="col-12">
              <h3>Resultados</h3>
            </div>
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>                    
                    <th scope="col">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(estadoPokemons)}
                  {
                    <tr>                      
                      <td>{estadoPokemons.name}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

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
