import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/0s0kjd52m3s3',
  headers: {
    authorization: 'Bearer TpBId6BcrKUm2Ej8S_-xohiBoJaRkQAbTDM5Lll41po',
  },
  cache: new InMemoryCache(),
});

export default apolloClient;
