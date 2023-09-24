import { useState } from "react";
import ReactDOM from "react-dom";
import ShowcaseLayout from "./ShowcaseLayout";

const ExampleLayout = () => {
  const [layout, setLayout] = useState([]);
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const stringifyLayout = () => {
    return layout.map((l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
      </div>
    ));
  };

  return (
    <div>
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      <ShowcaseLayout onLayoutChange={onLayoutChange} />
    </div>
  );
};

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.createRoot(contentDiv).render(<ExampleLayout {...gridProps} />);
