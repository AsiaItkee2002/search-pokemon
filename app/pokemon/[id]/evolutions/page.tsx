import { gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";
import Link from "next/link";

const GET_POKEMON_EVOLUTIONS = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      name
      evolutions {
        name
        image
      }
    }
  }
`;

// กำหนดประเภทให้กับข้อมูล evolution
interface Evolution {
  name: string;
  image: string;
}

export default async function PokemonEvolutionsPage({ params }: { params: { id: string } }) {
  const client = getClient();

  // ใช้ await เพื่อรอให้ params ได้ข้อมูลก่อนใช้งาน
  const { id } = await params;  // ใช้ await ที่ params
  
  try {
    const { data } = await client.query({
      query: GET_POKEMON_EVOLUTIONS,
      variables: { name: id },
    });

    const evolutions: Evolution[] = data.pokemon?.evolutions || [];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
            Evolutions of {data.pokemon.name}
          </h1>

          {evolutions.length > 0 ? (
            <div
              className={`${
                evolutions.length === 1
                  ? "flex justify-center"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"
              }`}
            >
              {evolutions.map((evolution) => (
                <div
                  key={evolution.name}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                >
                  {/* Pokémon Image */}
                  <img
                    src={evolution.image}
                    alt={evolution.name}
                    className="w-32 h-32 object-contain mb-3"
                  />

                  {/* Pokémon Name */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {evolution.name}
                  </h3>

                  {/* Read More Link */}
                  <Link
                    href={`/pokemon/${evolution.name}`}
                    className="mt-2 text-blue-500 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No evolutions available</p>
          )}

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
  } catch (error) {
    console.error("GraphQL error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-lg">Error fetching Pokémon evolutions</p>
      </div>
    );
  }
}
