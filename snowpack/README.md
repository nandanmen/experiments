# Snowpack

Snowpack works by compiling npm modules into ESM. It bundles NPM libs used by the app into a folder called "web_modules".

- These files can then be imported in scripts using ES6 import syntax

First test trying to compile together React and React DOM:

1. JSX imports need to be converted to `.js` imports
2. Imports to `node_modules/` need to be converted to imports to the parsed web modules

After making those changes, getting this error:

```
react.js:1008 Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```

I'm guessing there's common code between React and ReactDOM and it's causing issues.

- I noticed in the real snowpack build output there's a "common" folder for dependencies common to both React and ReactDOM. Could this solve the problem?

Doesn't this imply that snowpack needs to know about the dependency tree? Is this not taken care of by esbuild?

- Snowpack uses a tool called `esinstall` that turns a node module into a single JS file. Esinstall uses Rollup under the hood.

It looks like snowpack does the hard work of figuring out which node_modules need to be passed to `esinstall` by looking at the dependency tree of the source code.

In summary, snowpack:

1. Divides your app code into "source code" and "dependencies" - dependencies assume to not change much whereas source code is expected to change often
2. Every dependency is bundled into a single js file that lives in a `web_modules/` folder - this is done using `esinstall`
3. Source code is compiled down using `esbuild` but _not_ bundled - they are copied to a `dist/` folder. The `esbuild` compilation step does two things:
   1. Changes imports to `node_modules/` to refer to imports from the `web_modules/` folder instead
   2. Changes imports from `.jsx` to `.js`
