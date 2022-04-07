# Inside Framer's Magic Motion

By far my favourite part about Framer Motion is its layout animation API. Just slap on the `layout` prop to a motion component, and watch as it auto-magically animates from one position of the page to the next.

_How_ it manages to animate so smoothly - I have no idea. So I sought out to figure it out myself by trying to remake it from scratch! In this post, we'll try to uncover the secrets of framer's magical layout animations by reimplementing it step by step.

## Animating Position

Framer Motion's layout animations animates both the component's **position** as well as its **size**. As I was reimplementing this, animating size turned out to be a lot trickier, so we'll start by animating the component's position first.

### Can't We Do This With CSS?


