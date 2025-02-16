"use client";

import { ApolloProvider } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = getClient(); 
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

