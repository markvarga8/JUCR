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
