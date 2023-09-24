import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(RGL);

const ShowcaseLayout = (props) => {
  const [state, setState] = useState({
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: props.initialLayout }
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      mounted: true
    }));
  }, []);

  const generateDOM = () => {
    return _.map(state.layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint) => {
    setState((prevState) => ({
      ...prevState,
      currentBreakpoint: breakpoint
    }));
  };

  const onCompactTypeChange = () => {
    const { compactType: oldCompactType } = state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setState((prevState) => ({
      ...prevState,
      compactType
    }));
  };

  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
  };

  const onNewLayout = () => {
    setState((prevState) => ({
      ...prevState,
      layouts: { lg: generateLayout() }
    }));
  };

  return (
    <div>
      <div>
        Current Breakpoint: {state.currentBreakpoint} (
        {props.cols[state.currentBreakpoint]} columns)
      </div>
      <div>
        Compaction type: {_.capitalize(state.compactType) || "No Compaction"}
      </div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <ResponsiveReactGridLayout
        {...props}
        layouts={state.layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={state.mounted}
        compactType={state.compactType}
        preventCollision={!state.compactType}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function () {},
  cols: 12,
  initialLayout: generateLayout()
};

function generateLayout() {
  return _.map(_.range(0, 10), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

export default ShowcaseLayout;
