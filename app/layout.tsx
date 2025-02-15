import "./globals.css";
import type { Metadata } from "next";
import ApolloWrapper from "@/components/ApolloProvider";

export const metadata: Metadata = {
  title: "Search Pokémon",
  description: "Next.js GraphQL Pokémon Search App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
