import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}`,
  // optional headers
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export default client;
