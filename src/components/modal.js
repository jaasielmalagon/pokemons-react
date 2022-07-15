import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Modal = ({ pokemonData }) => {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [estadoPokemon, cambiarEstadoPokemon] = useState({});
  const [estadoPokemonEvolucion, cambiarEstadoPokemonEvolucion] = useState({});

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const pokemon = await axios
      .get(pokemonData.url)
      .then((response) => {
        let pokemon = response.data;
        cambiarEstadoPokemon(pokemon);
        getSpecies(pokemon.species.url);
      })
      .catch((error) => {
        console.error(error);
        cambiarEstadoPokemon({});
      });
    return pokemon;
  };

  const getSpecies = async (urlSpecies) => {
    const species = await axios
      .get(urlSpecies)
      .then((response) => {
        const urlEvolution = response.data.evolution_chain.url;
        getEvolution(urlEvolution);
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
    return species;
  };

  const getEvolution = async (urlEvolution) =>{
    const evolutions = await axios
      .get(urlEvolution)
      .then((response) => {
        const chain = response.data.chain; 
        cambiarEstadoPokemonEvolucion(chain);
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
    return evolutions;
  }

  return (
    <>
      <Boton onClick={() => cambiarEstadoModal(true)}>Ver detalles</Boton>
      {estadoModal && (
        <Overlay>
          <ContenedorModal>
            <Encabezado>
              <h3>Detalles del Pokemon</h3>
            </Encabezado>
            <BotonCerrar onClick={() => cambiarEstadoModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </BotonCerrar>
            <Contenido>
              <h1>{estadoPokemon.name.toUpperCase()}</h1>
              <div className="row">
                <img
                  alt={estadoPokemon.name}
                  src={estadoPokemon.sprites.front_default}
                />
              </div>
              <div
                className="row d-flex justify-content-between mb-4"
                style={{
                  overflowX: "hidden",
                  overflowY: "auto",
                  maxHeight: "200px",
                  border: "black solid 2px",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {estadoPokemonEvolucion.evolves_to.map((node, i) => (
                  <div
                    key={node.species.name + "-evo-" + i}
                    className="card mb-2"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <div className="row d-flex justify-content-between mb-3">
                        <h5 className="card-title">{node.species.name}</h5>
                        {console.log(node)}
                        {node.evolves_to.map((subnode, i) => (
                          <div
                            className="col"
                            style={{ border: "1px solid black" }}
                            key={subnode.species.name + "-evosubnode-" + i}
                          >
                            <p>{subnode.species.name}</p>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              key={subnode.species.name}
                              alt={subnode.species.name}
                              src={""}
                            />
                          </div>
                        ))}
                        {/* {Object.keys(
                          estadoPokemon.sprites.versions[version]
                        ).map((evolution) => (
                          <div
                            className="col"
                            style={{ border: "1px solid black" }}
                          >
                            <p>{evolution}</p>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              key={evolution}
                              alt={evolution}
                              src={
                                estadoPokemon.sprites.versions[version][
                                  evolution
                                ].front_default
                              }
                            />
                          </div>
                        ))} */}
                      </div>
                      <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <Boton onClick={() => cambiarEstadoModal(false)}>Aceptar</Boton>
            </Contenido>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContenedorModal = styled.div`
  width: 50%;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  color: black;
`;

const Encabezado = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;

  &:hover {
    background: #f2f2f2;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
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
