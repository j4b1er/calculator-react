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
      {button.name === "theme"
        ? theme === "dark"
          ? "☀️"
          : "🌙"
        : button.name.toUpperCase()}
      {/* {button.name.toUpperCase()} */}
    </button>
  );
}
