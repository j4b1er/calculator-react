export default function Button({ button, dispatch, theme }) {
  function handleClick() {
    dispatch({ type: button.action, payload: button });
  }

  return (
    <button
      className={`btn btn__${
        button.name === "0" ? `${button.action}-${button.name}` : button.action
      }`}
      onClick={handleClick}>
      {button.name.toUpperCase()}
    </button>
  );
}
