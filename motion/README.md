# Inside Framer's Magic Motion

By far my favourite part about Framer Motion is its layout animation API. Just slap on the `layout` prop to a motion component, and watch as it auto-magically animates from one position of the page to the next.

_How_ it manages to animate so smoothly - I have no idea. So I sought out to figure it out myself by trying to remake it from scratch! In this post, we'll try to uncover the secrets of framer's magical layout animations by reimplementing it step by step.

## Animating Position

Framer Motion's layout animations animates both the component's **position** as well as its **size**. As I was reimplementing this, animating size turned out to be a lot trickier, so we'll start by animating the component's position first.

### Can't We Do This With CSS?

---

- it looks like framer motion uses a projection tree to define its layout animations: https://cs.github.com/framer/motion/blob/4cc398a530606fd5cec7750f73fe39160e139f04/packages/framer-motion/src/projection/node/create-projection-node.ts#L52
  - the projection node is created on render through the `useProjection` hook: https://cs.github.com/framer/motion/blob/b784fb6a48de15a49c3e28019a5dec864aa8e7a7/packages/framer-motion/src/motion/features/use-projection.ts

what's the problem with using context?
  - the transform calculation is done in an effect, but we need to pass it to context at render
  - one way to do this is to set the state during the effect calculation
  - but because our effect runs on every render, this will "terminate" the existing calculation and rerun the effect
  - we might end up with an infinite loop here, so we want to make sure that setting the state in the transform like this doesn't re-run the effect
