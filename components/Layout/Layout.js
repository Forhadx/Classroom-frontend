import NavigationPage from "./Navigation";

export default function Layout(props) {
  return (
    <>
      <NavigationPage />
      <main className="main">{props.children}</main>
    </>
  );
}
