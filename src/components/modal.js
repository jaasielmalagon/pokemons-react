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

  const getEvolution = async (urlEvolution) => {
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
  };

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
              <h2>{estadoPokemon.name.toUpperCase()}</h2>
              <div className="row">
                <img
                  alt={estadoPokemon.name}
                  src={estadoPokemon.sprites.front_default}
                />
              </div>

              <Subcontainer>
                <div className="row g-0 mb-5">
                  <div className="col-12">
                    <h3>Habilidades</h3>
                  </div>
                  <div className="col-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Visibilidad</th>
                          <th scope="col">Slot</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {console.log(estadoPokemon.abilities)} */}
                        {estadoPokemon.abilities.map((item) => (
                          <tr key={item.ability.name}>
                            <th scope="row">1</th>
                            <td>{item.ability.name}</td>
                            <td>{item.is_hidden ? "Oculta" : "Visible"}</td>
                            <td>{item.slot}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row g-0 mb-5">
                  <div className="col-12">
                    <h3>Evoluciones</h3>
                  </div>
                  <div className="col-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Nombre</th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log(estadoPokemonEvolucion.evolves_to)}
                        {estadoPokemonEvolucion.evolves_to.map((node, i) => (
                          <React.Fragment key={"frag" + i}>
                            <tr key={node.species.name + "-evoNode-" + i}>
                              <th scope="row">{i}</th>
                              <td>{node.species.name}</td>
                            </tr>
                            {node.evolves_to.map((subnode, i) => (
                              <tr
                                key={subnode.species.name + "-evoSubnode-" + i}
                              >
                                <th scope="row">{i}</th>
                                <td>{subnode.species.name}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Subcontainer>

              {/* <Boton onClick={() => cambiarEstadoModal(false)}>Aceptar</Boton> */}
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
  max-height: 90%;
  height: 90%;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  color: black;
`;

const Encabezado = styled.div`
  height: 15%;
  max-height: 15%;
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
  height: 85%;
  max-height: 85%;
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

const Subcontainer = styled.div`
  overflow-y: auto;
  width: 100%;
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
