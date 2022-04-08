import React from "react";
import { motion } from "framer-motion";

import { Motion } from "./Motion";

export function App() {
  const ref = React.useRef();
  const [isOn, toggle] = React.useReducer((state) => !state, false);

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
                  borderRadius: "8px",
                  width: "160px",
                }
              : { top: "32px", left: "32px", borderRadius: "8px" }
          }
        >
          <p>Hello!</p>
        </Motion>
      </div>
      <div className="container">
        <motion.div
          ref={ref}
          layout
          className="motion"
          style={
            isOn
              ? {
                  bottom: "32px",
                  right: "32px",
                  borderRadius: "8px",
                  width: "160px",
                }
              : { top: "32px", left: "32px", borderRadius: "8px" }
          }
          transition={{ duration: 1.5 }}
        >
          <motion.p layout="position">Hello!</motion.p>
        </motion.div>
      </div>
    </>
  );
}
