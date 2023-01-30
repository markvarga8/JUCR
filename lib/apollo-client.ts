import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  // optional headers
  headers: {
    Authorization: "Bearer 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",
  },
  cache: new InMemoryCache(),
});

export default client;
