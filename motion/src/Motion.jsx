import React from "react";
import { animate } from "popmotion";

export function Motion(props) {
  const ref = React.useRef();
  const lastRect = React.useRef();

  React.useLayoutEffect(() => {
    const box = ref.current.getBoundingClientRect();

    if (isBoxDifferent(box, lastRect.current)) {
      const transform = invert({
        el: ref.current,
        from: box,
        to: lastRect.current,
      });

      play({
        el: ref.current,
        transform,
      });
    }

    lastRect.current = box;
  });

  return <div ref={ref} {...props} />;
}

function isBoxDifferent(box, lastBox) {
  // first mount
  if (!lastBox) {
    return false;
  }
  return JSON.stringify(box) !== JSON.stringify(lastBox);
}

function invert({ el, from, to }) {
  const { x: fromX, y: fromY, width: fromWidth, height: fromHeight } = from;
  const { x, y, width, height } = to;

  const transform = {
    x: x - fromX - (fromWidth - width) / 2,
    y: y - fromY - (fromHeight - height) / 2,
    scaleX: width / fromWidth,
    scaleY: height / fromHeight,
  };

  // We multiply by -1 to inverse the translation
  el.style.transform = `translate(${transform.x}px, ${transform.y}px) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`;

  return transform;
}

function play({ el, transform }) {
  animate({
    from: transform,
    to: {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    },
    onUpdate: ({ x, y, scaleY, scaleX }) => {
      el.style.transform = `translate(${x}px, ${y}px) scaleX(${scaleX}) scaleY(${scaleY})`;
    },
    duration: 1500,
  });
}
