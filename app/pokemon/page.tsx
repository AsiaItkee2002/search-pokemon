"use client";

import { useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/pokemon/${query.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-4">Search Pokémon</h1>        
        <SearchInput onSearch={handleSearch} />
      </div>
    </div>
  );
}

