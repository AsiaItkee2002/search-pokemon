import Link from "next/link";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";

// กำหนดประเภทให้กับข้อมูล attack
interface Attack {
  name: string;
  damage: number;
}

const GET_POKEMON_ATTACKS = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      attacks {
        fast {
          name
          damage
        }
        special {
          name
          damage
        }
      }
    }
  }
`;

async function fetchPokemonAttacks(name: string) {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POKEMON_ATTACKS,
    variables: { name },
  });

  return data?.pokemon?.attacks || { fast: [], special: [] };
}

export default async function PokemonAttackPage({ params }: { params: { id: string } }) {
  // ใช้ await เพื่อรอให้ params ได้ข้อมูลแล้วจึงใช้งาน
  const { id } = await params;
  
  // Fetch the Pokémon attacks based on the `id`
  const { fast, special } = await fetchPokemonAttacks(id);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
          {id} - Attacks
        </h1>

        {/* Fast Attacks */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Fast Attacks</h2>
          {fast.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fast.map((attack: Attack) => (
                <div key={attack.name} className="p-4 bg-blue-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-blue-700">{attack.name}</h3>
                  <p className="text-gray-600">Damage: {attack.damage}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No fast attacks available.</p>
          )}
        </div>

        {/* Special Attacks */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Special Attacks</h2>
          {special.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {special.map((attack: Attack) => (
                <div key={attack.name} className="p-4 bg-blue-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-blue-700">{attack.name}</h3>
                  <p className="text-gray-600">Damage: {attack.damage}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No special attacks available.</p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href={`/pokemon/${id}`}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              ← Back to {id}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

