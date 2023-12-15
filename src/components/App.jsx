import Header from "./Header";
import Body from "./Body";
import Button from "./Button";
import { buttons } from "../data/buttons";
import { useReducer } from "react";
import { useKey } from "../hooks/useKey";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const systemTheme = darkTheme ? "dark" : "light";

const initialState = {
  frontNum: "0",
  backNum: "0",
  mathAction: "",
  mathSign: "",
  theme: "",
};

function reducer(state, action) {
  const frontNumArr = state.frontNum.split("");
  const frontNumArrLength = frontNumArr.length;
  const backNumArr = state.backNum.split(" ");

  const operation = state.backNum.includes("=")
    ? state.frontNum + state.mathSign + backNumArr.at(2)
    : backNumArr.at(0) + state.mathSign + state.frontNum;

  const resultFunc =
    state.backNum !== "0" ? Function("return " + operation)() : "0";

  switch (action.type) {
    case "num":
      return {
        ...state,
        frontNum:
          state.frontNum !== "0"
            ? state.frontNum + action.payload.name
            : action.payload.name,
      };

    case "erase":
      return {
        ...state,
        frontNum:
          frontNumArrLength === 1
            ? "0"
            : frontNumArr
                .filter((num, i) => i !== frontNumArrLength - 1)
                .join(""),
      };

    case "addition":
    case "subtract":
    case "multiply":
    case "division":
      return {
        ...state,
        backNum:
          state.mathAction && !state.backNum.includes("=")
            ? `${resultFunc} ${action.payload.name}`
            : `${state.frontNum} ${action.payload.name}`,
        frontNum: "0",
        mathAction: action.payload.name,
        mathSign: action.payload.sign,
      };

    case "result":
      return {
        ...state,
        frontNum: state.backNum !== "0" ? `${resultFunc}` : state.frontNum,
        backNum:
          state.backNum !== "0"
            ? state.backNum.includes("=")
              ? backNumArr
                  .map((number, i) => (i === 0 ? state.frontNum : number))
                  .join(" ")
              : `${state.backNum} ${state.frontNum} =`
            : state.backNum,
      };

    case "period":
      return {
        ...state,
        frontNum: !state.frontNum.includes(".")
          ? state.frontNum + action.payload.name
          : state.frontNum,
      };

    case "switchTheme":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case "clear":
      return { ...initialState, theme: state.theme };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [themeValue, setThemeValue] = useLocalStorageState(
    systemTheme,
    "theme"
  );

  const [{ frontNum, backNum, theme }, dispatch] = useReducer(reducer, {
    ...initialState,
    theme: themeValue,
  });

  useKey(buttons, dispatch);

  return (
    <div className="app" data-theme={theme}>
      <div className="calculator">
        <Header>
          <h1 className="calculator__header--title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
            </svg>
            Calculator
          </h1>
          <div className="calculator__header--calc">
            <div className="calculator__header--past">
              {backNum !== "0" ? backNum : ""}
            </div>
            <div className="calculator__header--curr">{frontNum}</div>
          </div>
        </Header>
        <Body>
          {buttons.map((btn) => (
            <Button
              button={btn}
              dispatch={dispatch}
              theme={theme}
              onThemeValue={setThemeValue}
              key={btn.name}
            />
          ))}
        </Body>
      </div>
    </div>
  );
}
