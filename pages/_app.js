import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/carousels.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
