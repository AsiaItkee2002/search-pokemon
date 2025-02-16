// import Link from "next/link";

// interface EvolutionsProps {
//   evolutions: { name: string }[];
// }

// export default function Evolutions({ evolutions }: EvolutionsProps) {
//   if (!evolutions.length) {
//     return <p className="text-center text-gray-500">No evolutions available</p>;
//   }

//   return (
//     <ul className="list-disc list-inside text-center">
//       {evolutions.map((evolution) => (
//         <li key={evolution.name}>
//           <Link href={`/pokemon/${evolution.name}`} className="text-blue-500 underline">
//             {evolution.name}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }



import Link from "next/link";

interface EvolutionsProps {
  evolutions: { name: string, image: string }[];
}

export default function Evolutions({ evolutions }: EvolutionsProps) {
  if (!evolutions.length) {
    return <p className="text-center text-gray-500">No evolutions available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
      {evolutions.map((evolution) => (
        <div key={evolution.name} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          {/* Pokémon Image */}
          <img src={evolution.image} alt={evolution.name} className="w-32 h-32 object-contain mb-3" />

          {/* Pokémon Name */}
          <h3 className="text-lg font-semibold text-gray-800">{evolution.name}</h3>

          {/* Read More Link */}
          <Link
            href={`/pokemon/${evolution.name}`}
            className="mt-2 text-blue-500 hover:text-blue-700 font-medium"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}
