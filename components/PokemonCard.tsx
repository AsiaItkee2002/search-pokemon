import Link from "next/link";

interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  name: string;
}

interface PokemonCardProps {
  name: string;
  image?: string;
  number: string;
  types?: string[];
  attacks?: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: Evolution[];
}

export default function PokemonCard({
  name,
  image,
  number,
  types,
  attacks,
  evolutions,
}: PokemonCardProps) {
  return (
    <div className="border p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-16 md:space-y-0 max-w-5xl mx-auto bg-white">
      
      {/* รูป Pokémon */}
      <div className="flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-80 h-80 md:w-64 md:h-64 rounded-xl border-4 border-gray-500 shadow-xl"
          />
        ) : (
          <div className="w-80 h-80 flex items-center justify-center bg-gray-200 text-gray-600 rounded-xl">
            No image available
          </div>
        )}
      </div>

      {/* ข้อมูล Pokémon */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        
        {/* ชื่อ Pokémon */}
        <h1 className="text-3xl font-semibold text-white bg-blue-900 p-4 rounded-lg shadow-xl inline-block">
          {name} #{number}
        </h1>

        {/* ประเภท Pokémon */}
        <p className="text-lg text-gray-600">
          Type: {types?.length ? types.join(", ") : <span className="bg-gray-200 p-2 rounded-md">No types available</span>}
        </p>

        {/* Fast Attacks */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Fast Attacks</h2>
          {attacks?.fast?.length ? (
            <ul className="list-disc pl-6 space-y-2">
              {attacks.fast.map((attack) => (
                <li key={attack.name} className="text-md text-gray-700">
                  {attack.name} ({attack.type}) - {attack.damage} damage
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-gray-200 text-gray-600 p-2 rounded-md">No fast attacks available</p>
          )}
        </div>

        {/* Special Attacks */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Special Attacks</h2>
          {attacks?.special?.length ? (
            <ul className="list-disc pl-6 space-y-2">
              {attacks.special.map((attack) => (
                <li key={attack.name} className="text-md text-gray-700">
                  {attack.name} ({attack.type}) - {attack.damage} damage
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-gray-200 text-gray-600 p-2 rounded-md">No special attacks available</p>
          )}
        </div>

        {/* Evolutions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Evolutions</h2>
          {evolutions?.length ? (
            <ul className="list-disc pl-6 space-y-2">
              {evolutions.map((evolution) => (
                <li key={evolution.name} className="text-md text-gray-700">
                  <Link href={`/pokemon/${evolution.name}`} className="text-blue-500 hover:underline">
                    {evolution.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-gray-100 text-gray-600 p-2 rounded-md">No evolutions available</p>
          )}
        </div>
      </div>
    </div>
  );
}
