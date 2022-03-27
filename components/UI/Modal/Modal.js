export default function Modal(props) {
  return (
    <>
      <div
        className={`backdrop ${props.showModal ? "open" : ""}`}
        onClick={props.closeModalhandler}
      ></div>
      <div className={`modal ${props.showModal ? "open" : ""}`}>
        {props.children}
      </div>
    </>
  );
}
