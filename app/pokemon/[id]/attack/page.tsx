// import Link from "next/link";
// import { gql } from "@apollo/client";
// import { getClient } from "@/lib/apolloClient";

// const GET_POKEMON_ATTACKS = gql`
//   query GetPokemon($name: String!) {
//     pokemon(name: $name) {
//       attacks {
//         fast {
//           name
//           damage
//         }
//         special {
//           name
//           damage
//         }
//       }
//     }
//   }
// `;

// export default async function PokemonAttackPage({ params }: { params: { id: string } }) {
//   const client = getClient();

//   try {
//     const { data } = await client.query({
//       query: GET_POKEMON_ATTACKS,
//       variables: { name: params.id },
//     });

//     const fastAttacks = data.pokemon?.attacks?.fast || [];
//     const specialAttacks = data.pokemon?.attacks?.special || [];

    

//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
//             {params.id} - Attacks
//           </h1>

//           {/* Fast Attacks */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-3">Fast Attacks</h2>
//             {fastAttacks.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {fastAttacks.map((attack: any) => (
//                   <div key={attack.name} className="p-4 bg-blue-100 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold text-blue-700">{attack.name}</h3>
//                     <p className="text-gray-600">Damage: {attack.damage}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No fast attacks available.</p>
//             )}
//           </div>

//           {/* Special Attacks */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-700 mb-3">Special Attacks</h2>
//             {specialAttacks.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {specialAttacks.map((attack: any) => (
//                   <div key={attack.name} className="p-4 bg-blue-100 rounded-lg shadow">
//                     <h3 className="text-lg font-semibold text-blue-700">{attack.name}</h3>
//                     <p className="text-gray-600">Damage: {attack.damage}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No special attacks available.</p>
//             )}
//           </div>

//           {/* Back Button */}
//           <div className="mt-8 text-center">
//             <Link href={`/pokemon/${params.id}`}>
//               <button
//                 type="button"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
//                 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//               >
//                 ← Back to {params.id}
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("GraphQL error:", error);
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-center text-red-500 text-lg">Error fetching Pokémon attacks</p>
//       </div>
//     );
//   }
// }

import Link from "next/link";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";

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

// กำหนดประเภทให้กับข้อมูล attack
interface Attack {
  name: string;
  damage: number;
}

export default async function PokemonAttackPage({ params }: { params: { id: string } }) {
  const client = getClient();

  try {
    const { data } = await client.query({
      query: GET_POKEMON_ATTACKS,
      variables: { name: params.id },
    });

    const fastAttacks: Attack[] = data.pokemon?.attacks?.fast || [];
    const specialAttacks: Attack[] = data.pokemon?.attacks?.special || [];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
            {params.id} - Attacks
          </h1>

          {/* Fast Attacks */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Fast Attacks</h2>
            {fastAttacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fastAttacks.map((attack) => (
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
            {specialAttacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialAttacks.map((attack) => (
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
            <Link href={`/pokemon/${params.id}`}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                ← Back to {params.id}
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
        <p className="text-center text-red-500 text-lg">Error fetching Pokémon attacks</p>
      </div>
    );
  }
}
