import Header from "./Header";
import Body from "./Body";
import Button from "./Button";
import { buttons } from "../data/buttons";
import { useReducer } from "react";
import { useKey } from "../hooks/useKey";

const initialState = {
  frontNum: "0",
  backNum: "0",
  mathAction: "",
  mathSign: "",
  result: null,
};

function reducer(state, action) {
  const frontNumArr = state.frontNum.split("");
  const frontNumArrLength = state.frontNum.length;
  const backNumArr = state.backNum.split(" ");
  const resultFunc = Function(
    "return " + backNumArr.at(0) + state.mathSign + state.frontNum
  )();

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
        backNum: state.result ? "0" : state.backNum,
      };

    case "addition":
    case "subtract":
    case "multiply":
    case "division":
    case "mod":
      return {
        ...state,
        backNum: state.mathAction
          ? `${resultFunc} ${action.payload.name}`
          : `${state.frontNum} ${action.payload.name}`,
        frontNum: "0",
        // frontNum: state.mathAction ? state.frontNum : "0",
        mathAction: action.payload.name,
        mathSign: action.payload.sign,
        result:
          state.backNum !== "0" && state.mathAction !== ""
            ? resultFunc
            : state.result,
      };

    case "result":
      return {
        ...state,
        backNum: `${state.backNum} ${state.frontNum}`,
        result: resultFunc,
      };

    case "clear":
      return { ...initialState };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ frontNum, backNum, result }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useKey(buttons, dispatch);

  return (
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
          <div className="calculator__header--curr">
            {result === null ? frontNum : result}
          </div>
        </div>
      </Header>
      <Body>
        {buttons.map((btn) => (
          <Button button={btn} dispatch={dispatch} key={btn.name} />
        ))}
      </Body>
    </div>
  );
}
