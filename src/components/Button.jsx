export default function Button({
  button,
  dispatch,
  theme,
  themeValue,
  onThemeValue,
}) {
  function handleClick() {
    if (button.name === "theme") {
      const themeSelected = themeValue === "dark" ? "dark" : "light";
      onThemeValue(themeSelected);
      dispatch({ type: button.action, payload: button });
    } else {
      dispatch({ type: button.action, payload: button });
    }
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
    </button>
  );
}
