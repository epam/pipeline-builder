# Customizing the graph appearance

In order to customize graph styling you can [include your own](link-library.md) styles file instead of [included in the library](src/pipeline.scss) or override the specific styles you want to change.

Following styles are responsible for task/workflow representation appearance:
```scss
.joint-type-visualstep {
  /* task/workflow representation styling */
  text {
    font-weight: 500;
    font-family: "Source Sans Pro", sans-serif;
  }

  rect {
    rx: 5px;
    ry: 5px;
  }

  .body {
    fill: $white;
    stroke: $step-color;
    stroke-width: 2px;
  }

  // task/workflow representation heading text
  .label {
    fill: $step-color;
    font-size: 16px;
  }
  /* /task/workflow representation */

  /* task's/workflow's ports (inputs & outputs) styling */
  .port-body {
    stroke: $white;
    stroke-width: 3px;
    fill: $port-color;
  }

  .port-body.empty {
    stroke: $port-color-empty;
    stroke-width: 1.5px;
    fill: $white;
  }

  .port-body.available-magnet {
    fill: $port-color-available;
  }

  .port-body.disabled {
    opacity: 0.5;
  }

  .port-body:hover {
    opacity: 1;
    fill: $step-color;
  }

  .port-label {
    fill: $port-color;
    text-decoration: none;
    text-transform: none;
  }
  /* /port (inputs & outputs) styling */
}

// selected task/workflow representation styling
.joint-type-visualstep.selected {
  .body {
    stroke: $graphite;
    stroke-width: 3px;
  }
}

// target port highlighting when making new connection
.joint-highlight-stroke {
  stroke: $port-color-empty;
}

```

Following styles are responsible for connections between tasks/workflows:
```scss
// task's/workflow's connections styling
.joint-type-visuallink {
  .connection {
    stroke: $port-color;
    stroke-width: 2px;
  }
}

// task's/workflow's merged connections styling
.joint-type-visualmergedlink {
  .connection {
    stroke: $mergedLinkColor;
    stroke-width: 4px;
  }
}

// common connection styles
.joint-link {
  .marker-arrowheads .marker-arrowhead,
  .marker-vertex-group .marker-vertex,
  .marker-vertex-group .marker-vertex:hover {
    fill: $port-color;
  }

  .marker-arrowheads .marker-arrowhead:hover {
    fill: $step-color;
  }

  .link-tools .link-tool .tool-remove circle {
    fill: $raspberry;
  }
}
```
