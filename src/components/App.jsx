import Header from "./Header";
import Body from "./Body";

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
      <Body></Body>
    </div>
  );
}
