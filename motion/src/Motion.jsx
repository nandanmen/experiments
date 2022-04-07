import React from "react";
import { animate } from "popmotion";

export function Motion(props) {
  const ref = React.useRef();
  const lastRect = React.useRef();

  React.useLayoutEffect(() => {
    const box = ref.current.getBoundingClientRect();

    if (isBoxDifferent(box, lastRect.current)) {
      transformElement({
        el: ref.current,
        from: box,
        to: lastRect.current,
      });
      animateElement({
        el: ref.current,
        from: lastRect.current,
        to: box,
        onDone: () => {
          lastRect.current = box;
        },
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

function transformElement({ el, from, to }) {
  const { deltaX, deltaY, deltaWidth, deltaHeight, diffWidth, diffHeight } =
    getDelta({ from, to });

  const diff = {
    x: (deltaX + diffWidth / 2) * -1,
    y: (deltaY + diffHeight / 2) * -1,
    width: 1 / deltaWidth,
    height: 1 / deltaHeight,
  };

  // We multiply by -1 to inverse the translation
  el.style.transform = `translate(${diff.x}px, ${diff.y}px) scaleX(${diff.width}) scaleY(${diff.height})`;
}

function animateElement({ el, from, to, onDone }) {
  const { deltaX, deltaY, deltaWidth, deltaHeight } = getDelta({ from, to });
  animate({
    from: {
      x: deltaX,
      y: deltaY,
      height: deltaHeight,
      width: deltaWidth,
    },
    to: {
      x: 0,
      y: 0,
      height: 1,
      width: 1,
    },
    onUpdate: ({ x, y, height, width }) => {
      el.style.transform = `translate(${x}px, ${y}px) scaleX(${width}) scaleY(${height})`;
    },
    onComplete: onDone,
    duration: 1500,
  });
}

function getDelta({ from, to }) {
  const { x, y, width, height } = to;
  const { x: lastX, y: lastY, width: lastWidth, height: lastHeight } = from;

  return {
    deltaX: lastX - x,
    deltaY: lastY - y,
    deltaWidth: lastWidth / width,
    deltaHeight: lastHeight / height,
    diffWidth: lastWidth - width,
    diffHeight: lastHeight - height,
  };
}
