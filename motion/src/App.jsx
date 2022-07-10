import React from "react";
import { motion } from "framer-motion";

import { Motion } from "./Motion";

const offStyles = { top: "32px", left: "32px", borderRadius: "8px" };
const onStyles = {
  bottom: "32px",
  right: "32px",
  borderRadius: "8px",
  width: "160px",
};

export function App() {
  const [isOn, toggle] = React.useReducer((state) => !state, false);

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <div className="wrapper">
        <div className="container">
          <div className="motion reference" style={offStyles} />
          <div className="motion reference" style={onStyles} />
          <Motion className="motion" style={isOn ? onStyles : offStyles} />
        </div>
        <div className="container">
          <motion.div
            layout
            className="motion"
            style={isOn ? onStyles : offStyles}
            transition={{ duration: 1.5 }}
          />
        </div>
      </div>
      <ScaleCorrection />
    </>
  );
}

const ScaleCorrection = () => {
  const [isOn, toggle] = React.useReducer((state) => !state, false);
  const onStyles = { width: "300px", height: "160px", borderRadius: "8px" };
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <div className="wrapper">
        <div className="container flex">
          <div className="motion reference" style={onStyles} />
          <Motion
            className="motion relative"
            style={isOn ? onStyles : { borderRadius: "8px" }}
          >
            <Motion>Hello!</Motion>
          </Motion>
        </div>
        <div className="container flex">
          <motion.div
            layout
            className="motion relative"
            style={isOn ? onStyles : { borderRadius: "8px" }}
            transition={{ duration: 1.5 }}
          >
            <motion.p layout>Hello!</motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
};
