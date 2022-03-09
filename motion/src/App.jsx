import React from "react";
import { motion } from "framer-motion";

import { Motion } from "./Motion";

export function App() {
  const ref = React.useRef();
  const [isOn, toggle] = React.useReducer((state) => !state, false);

  React.useLayoutEffect(() => {
    console.log(ref.current.style.transform, ref.current.style.transformOrigin);
  });

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <div className="container">
        <Motion
          className="motion"
          style={
            isOn
              ? {
                  bottom: "32px",
                  right: "32px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "8px",
                }
              : { top: "32px", left: "32px", borderRadius: "8px" }
          }
        />
      </div>
      <div class="container">
        <motion.div
          ref={ref}
          layout
          className="motion"
          style={
            isOn
              ? {
                  bottom: "32px",
                  right: "32px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "8px",
                }
              : { top: "32px", left: "32px", borderRadius: "8px" }
          }
          transition={{ duration: 1.5 }}
        />
      </div>
    </>
  );
}
