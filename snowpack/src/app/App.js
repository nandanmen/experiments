import React from "./web_modules/react.js";
function App() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return /* @__PURE__ */ React.createElement(
    "div",
    null,
    /* @__PURE__ */ React.createElement("h1", null, "Counter"),
    /* @__PURE__ */ React.createElement("p", null, count)
  );
}
var App_default = App;
export { App_default as default };
