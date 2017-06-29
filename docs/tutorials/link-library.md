# Linking the Library

Pipeline builder is available as a UMD library. It can be accessed as:
- a global variable `pipeline` defined in a `<SCRIPT>` tag,
- CommonJS module ([Node.js]),
- `'pipeline'` AMD module ([Require.js]).

It undoubtedly supports bundling with [Webpack].
Another option is a separate ECMAScript 2015 module (`pipeline.module.js`) useful
for bundling with [Rollup.js].

[Node.js]: https://nodejs.org/
[Require.js]: http://requirejs.org/
[Rollup.js]: http://rollupjs.org/
[Webpack]: https://webpack.github.io/

### In a SCRIPT tag

_index.html_

```html
...

<link rel="stylesheet" href="dist/pipeline.min.css">
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/lodash/lodash.js"></script>
<script src="dist/pipeline.min.js"></script>

...
```

### In a Webpack 2 Configuration

_index.html_

```html
...
<script src="app.bundle.js"></script>
...
```

_app.js_

```js
import 'dist/pipeline.css';
import pipeline from 'dist/pipeline.js';
...
```

_webpack.config.js_

```js
module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname,
    filename: "app.bundle.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  resolve: {
    alias: {
      underscore: 'lodash',
    },
  },
};
```

## Using the Library

Prepare a DIV element to embed into.

```html
<div id="diagram"></div>
```
Create a workflow (see {@tutorial create-workflow} for details).

```js
function createFlow() {
  var flow = new pipeline.Workflow('flow');
  var a = flow.add(new pipeline.Step('A', {
    i: { in: {} },
    o: { out: {} },
  }));
  var b = flow.add(new pipeline.Step('B', {
    i: { in: { bind: a.o.out } },
    o: { out: {} },
  }));
  var c = flow.add(new pipeline.Step('C', {
    i: { in: { bind: b.o.out } },
    o: { out: {} },
  }));

  return flow;
}
```

Create a visualizer and attach it to the workflow.

```js
var diagram = new pipeline.Visualizer(document.getElementById('diagram'));
diagram.attachTo(createFlow());
```
