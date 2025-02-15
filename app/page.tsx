"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_POKEMON_INFO = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      evolutions {
        name
      }
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`;

export default function Home() {
  const [search, setSearch] = useState("Pikachu");
  const { loading, error, data } = useQuery(GET_POKEMON_INFO, {
    variables: { name: search },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Search Pokémon</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter Pokémon name"
        className="border p-2 rounded mb-4"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.pokemon && (
        <div className="text-center">
          <h2 className="text-xl font-semibold">{data.pokemon.name}</h2>
          <img src={data.pokemon.image} alt={data.pokemon.name} className="w-32 h-32 mx-auto my-4" />
          <p>Type: {data.pokemon.types.join(", ")}</p>
          <h3 className="mt-4 font-semibold">Special Attacks:</h3>
          <ul>
            {data.pokemon.attacks.special.map((attack: any) => (
              <li key={attack.name}>{attack.name} - {attack.damage} damage</li>
            ))}
          </ul>
          {data.pokemon.evolutions && (
            <div className="mt-4">
              <h3 className="font-semibold">Evolutions:</h3>
              <ul>
                {data.pokemon.evolutions.map((evolution: any) => (
                  <li key={evolution.name} onClick={() => setSearch(evolution.name)} className="cursor-pointer text-blue-500 underline">
                    {evolution.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
