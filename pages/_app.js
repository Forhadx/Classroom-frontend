import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { SSRProvider } from "@react-aria/ssr";
import { AuthContextProvider } from "../store/Auth/Auth-Context";
import { RoomContextProvider } from "../store/Room/Room-Context";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthContextProvider>
        <RoomContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RoomContextProvider>
      </AuthContextProvider>
    </SSRProvider>
  );
}

export default MyApp;
