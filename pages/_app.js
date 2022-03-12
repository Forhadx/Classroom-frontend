import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
