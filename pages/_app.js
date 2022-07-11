import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from "../src/Components/constant";
import "../styles/globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const httpLink = createHttpLink({
  uri:'http://localhost:5000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),

});



function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  );
}

export default MyApp;