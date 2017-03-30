# Creating a Workflow

A {@link Workflow} can be seen as a sequence of {@link Step Steps} each performing some
{@link Action}. Steps are connected by their input and output {@link Port Ports}: an output
of a step is taken as an input to another step.

There are a few languages and APIs introduced to describe workflows. Some of them allow
to set up and execute shell scripts, like [_Workflow Description Language_] (WDL) and 
[_Common Workflow Language_] (CWL) do, others are used in more specific domains
(e.g., [Grunt] and [Gulp] JavaScript task runners).

Note that different terms are used in different languages.
WDL operates _Tasks_ and _Calls_, CWL uses _Tools_ and _Steps_. 

[_Workflow Description Language_]: https://software.broadinstitute.org/wdl/
[_Common Workflow Language_]: http://www.commonwl.org/
[Grunt]: https://gruntjs.com/
[Gulp]: http://gulpjs.com/


```js
// Create an action
const action = new Action('foo', { i: { value: {} }});

// Use this action in a step
const step1 = new Step('foo1', action, { i: { value: { bind: 42 }}});
const step2 = new Step('foo2', action, { i: { value: { bind: 11 }}});

// Add steps to a workflow
const flow = new Workflow('flow');
flow.add(step1);
flow.add(step2);
```

See examples for more details.
