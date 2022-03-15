import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { SSRProvider } from "@react-aria/ssr";
import { AuthContextProvider } from "../store/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </SSRProvider>
  );
}

export default MyApp;
