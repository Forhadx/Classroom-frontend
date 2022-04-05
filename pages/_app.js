import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { SSRProvider } from "@react-aria/ssr";
import { AuthContextProvider } from "../store/Auth/Auth-Context";
import { RoomContextProvider } from "../store/Room/Room-Context";
import { TeamContextProvider } from "../store/Team/Team-Context";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthContextProvider>
        <RoomContextProvider>
          <TeamContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TeamContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
    </SSRProvider>
  );
}

export default MyApp;
