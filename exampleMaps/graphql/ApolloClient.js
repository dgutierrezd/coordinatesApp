import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/graphql',
});
// web: 10.0.2.2
// mobile: 192.168.1.254
export default client;
