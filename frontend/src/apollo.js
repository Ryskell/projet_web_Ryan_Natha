import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;
