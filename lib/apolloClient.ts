import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getClient = () =>{
    return new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
        cache: new InMemoryCache(),
    });
}

// export const getClient = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_API, 
//   cache: new InMemoryCache(),
// });

