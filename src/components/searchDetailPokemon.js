import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const SearchInputByName = ({ pokemonData }) => {
  const [estadoPokemon, cambiarEstadoPokemon] = useState([]);
  const [estadoSearch, cambiarEstadoSearch] = useState([]);
  const [showTable, showTableState] = useState(false);

  useEffect(() => {
    // getPokemon();
  }, []);

  const getPokemon = async () => {
    const pokemon = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${estadoSearch}`)
      .then((response) => {
        console.log(response);
        let pokemons = response.data;
        cambiarEstadoPokemon(pokemons);
        showTableState(true);
      })
      .catch((error) => {
        console.error(error);
        cambiarEstadoPokemon([]);
        showTableState(false);
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
                      cambiarEstadoSearch(evt.target.value.toLowerCase());
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
        {showTable === true && (
          <div className="row g-0 my-5">
            <div className="col-12">
              <h3>Resultados</h3>
            </div>
            <div className="col-12">
              <img
                alt={estadoPokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${estadoPokemon.id}.png`}
              ></img>
              <table className="table" style={{ color: "white" }}>
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Habilidades</th>
                    <th scope="col">Formas</th>
                    <th scope="col">Altura</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(estadoPokemon)}
                  {
                    <tr>
                      <td>{estadoPokemon.name}</td>
                      <td className="">
                        <ol
                          className="w-50"
                          style={{ margin: "auto", padding: "0" }}
                        >
                          {estadoPokemon.abilities.map((ability) => (
                            <li key={ability.ability.name}>
                              {ability.ability.name}
                            </li>
                          ))}
                        </ol>
                      </td>
                      <td>
                        {
                          <ol
                            className="w-50"
                            style={{ margin: "auto", padding: "0" }}
                          >
                            {estadoPokemon.forms.map((form) => (
                              <li key={form.name}>{form.name}</li>
                            ))}
                          </ol>
                        }
                      </td>
                      <td>{estadoPokemon.height}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showTable === false && (
          <h3 className="my-5">SIN RESULTADOS OBTENIDOS</h3>
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
