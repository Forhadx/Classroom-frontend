import NavigationPage from "./Navigation";
import Link from "next/link";

export default function Layout(props) {
  return (
    <>
      <NavigationPage />
      <main className="main">{props.children}</main>
      <div>
        <Link href="/faculty/rooms">/faculty/rooms</Link>
        <br />
        <Link href="/faculty/rooms/1">/faculty/rooms/1</Link>
        <br />
        <Link href="/faculty/rooms/1/attendance">
          /faculty/rooms/1/attendance
        </Link>
        <br />
        <hr />
        <Link href="/student/rooms">/student/rooms</Link>
        <br />
        <Link href="/student/rooms/1">/student/rooms/1</Link>
        <br />
        <Link href="/student/rooms/1/attendance">
          /student/rooms/1/attendance
        </Link>
      </div>
    </>
  );
}
