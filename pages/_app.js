import Layout from "../components/Layout/Layout";
import "../styles/globals.scss";
import { SSRProvider } from "@react-aria/ssr";
import { AuthContextProvider } from "../store/Auth/Auth-Context";
import { RoomContextProvider } from "../store/Room/Room-Context";
import { TeamContextProvider } from "../store/Team/Team-Context";
import { NoteContextProvider } from "../store/Note/Note-Context";
import { AttendanceContextProvider } from "../store/Attendance/Attendance-Context";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthContextProvider>
        <RoomContextProvider>
          <TeamContextProvider>
            <NoteContextProvider>
              <AttendanceContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AttendanceContextProvider>
            </NoteContextProvider>
          </TeamContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
    </SSRProvider>
  );
}

export default MyApp;
