export default function Button({ button, dispatch }) {
  return (
    <button
      className={`btn btn__${
        button.name === "0" ? `${button.action}-${button.name}` : button.action
      }`}
      onClick={() => dispatch({ type: button.action, payload: button.name })}>
      {button.name}
    </button>
  );
}
