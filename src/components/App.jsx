import Header from "./Header";
import Body from "./Body";
import Button from "./Button";

const buttons = [
  {
    name: "%",
    action: "mod",
  },
  {
    name: "÷",
    action: "division",
  },
  {
    name: "CE",
    action: "clear",
  },
  {
    name: "←",
    action: "erase",
  },
  {
    name: "7",
    action: "num",
  },
  {
    name: "8",
    action: "num",
  },
  {
    name: "9",
    action: "num",
  },
  {
    name: "X",
    action: "multiply",
  },
  {
    name: "4",
    action: "num",
  },
  {
    name: "5",
    action: "num",
  },
  {
    name: "6",
    action: "num",
  },
  {
    name: "-",
    action: "subtract",
  },
  {
    name: "1",
    action: "num",
  },
  {
    name: "2",
    action: "num",
  },
  {
    name: "3",
    action: "num",
  },
  {
    name: "+",
    action: "addition",
  },
  {
    name: "0",
    action: "num",
  },
  {
    name: ".",
    action: "period",
  },
  {
    name: "=",
    action: "result",
  },
];

export default function App() {
  return (
    <div className="calculator">
      <Header>
        <h1 className="calculator__header--title">Calculator</h1>
        <div className="calculator__header--calc">
          <div className="calculator__header--past">10 / </div>
          <div className="calculator__header--curr">100</div>
        </div>
      </Header>
      <Body>
        {buttons.map((btn) => (
          <Button button={btn} key={btn.name} />
        ))}
      </Body>
    </div>
  );
}
