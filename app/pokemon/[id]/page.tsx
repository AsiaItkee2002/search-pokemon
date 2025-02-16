"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react"; 
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import PokemonCard from "@/components/PokemonCard";
import SearchInput from "@/components/SearchInput"; 

const GET_POKEMON_INFO = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      number
      name
      image
      types
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        name
      }
    }
  }
`;

export default function PokemonPage() {
  const { id } = useParams();
  // แปลง id เป็น string 
  const searchTerm = Array.isArray(id) ? id[0] : id || ""; // หากเป็น array ให้เลือกค่าครั้งแรก หรือถ้าไม่มีค่าก็ให้เป็น ""

  const [query, setQuery] = useState<string>(searchTerm); 
  const { data, loading, error } = useQuery(GET_POKEMON_INFO, {
    variables: { name: query },
    skip: !query, 
  });

  const handleSearch = (query: string) => {
    setQuery(query); 
  };

  if (loading) return <Loading />;
  if (error) return <Error message="Error fetching Pokémon data" />;
  if (!data?.pokemon) return <Error message="Pokémon not found" />;

  return (
    <div className="text-center p-4 ">
      <div className="mb-4">
        {/* แสดง SearchInput */}
      <SearchInput onSearch={handleSearch} />
      </div>
    
      {/* แสดงข้อมูลของ Pokémon */}
      <PokemonCard
        name={data.pokemon.name}
        image={data.pokemon.image}
        number={data.pokemon.number}
        types={data.pokemon.types}
        attacks={data.pokemon.attacks} // ส่ง attacks ทั้ง fast และ special
        evolutions={data.pokemon.evolutions}
      />

      
    </div>
  );
}

