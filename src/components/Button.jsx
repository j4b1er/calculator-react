export default function Button({ button }) {
  return (
    <button
      className={`btn btn__${
        button.name === "0" ? `${button.action}-${button.name}` : button.action
      }`}>
      {button.name}
    </button>
  );
}
