import {
  dia, V, Vectorizer, VElement,
} from 'jointjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RichTextStyle = Record<string, any>;

export interface RichTextPart {
  text: string;
  style?: RichTextStyle;
}

export type RichText = RichTextPart | string;

const DEFAULT_STYLE = {
  fontSize: 14,
};
const SMALL = {
  ...DEFAULT_STYLE,
  fontSize: 12,
};
const BOLD = {
  fontWeight: 'bold',
};
const ITALIC = {
  fontStyle: 'italic',
};

export {
  DEFAULT_STYLE,
  SMALL,
  BOLD,
  ITALIC,
};

export function getStyle(...style: RichTextStyle[]): RichTextStyle {
  if (style.length === 0) {
    return {};
  }
  if (style.length === 1) {
    return { ...(style[0] || {}) };
  }
  const [s1, s2, ...rest] = style;
  return getStyle(
    {
      ...(s1 || {}),
      ...(s2 || {}),
    },
    ...rest,
  );
}

interface Annotation {
  start: number;
  end: number;
  attrs: RichTextStyle;
}
interface RichTextMerged {
  text: string;
  annotations: Annotation[];
}

export interface TextWithOptions {
  text: string;
  options?: Vectorizer.TextOptions;
}

export type SVGText = string | TextWithOptions;

function parseCamelCaseString(camelCaseString: string): string {
  if (!camelCaseString) {
    return camelCaseString;
  }
  return camelCaseString
    .split(/([A-Z])/g)
    .reduce(
      (r, c, idx) => r
        .concat(r.length > 0 && idx % 2 === 1 ? '-' : '')
        .concat(c.toLowerCase()),
      '',
    );
}

function normalizeStyle(style: RichTextStyle): RichTextStyle {
  if (!style) {
    return {};
  }
  return Object.entries(style).map(([property, value]) => ({
    property: parseCamelCaseString(property),
    value,
  })).reduce((r, c) => ({
    ...r,
    [c.property]: c.value,
  }), {});
}

export function getSVGText(
  ...text: RichText[]
): SVGText {
  const parts: RichTextPart[] = text.map((textEntry) => (
    typeof textEntry === 'string'
      ? { text: textEntry } as RichTextPart
      : textEntry
  ));
  const richText = parts.reduce<RichTextMerged>((result, part) => {
    const {
      text: rText = '',
      annotations = [],
    } = result;
    let resultedText = rText;
    if (rText.length) {
      resultedText = resultedText.concat(' ');
    }
    const start = resultedText.length;
    const end = start + part.text.length;
    return {
      text: resultedText.concat(part.text),
      annotations: [
        ...annotations,
        {
          start,
          end,
          attrs: normalizeStyle(part.style || {}),
        },
      ],
    };
  }, { text: '', annotations: [] });
  if (richText.annotations.length > 0) {
    return {
      text: richText.text,
      options: {
        annotations: richText.annotations,
      },
    };
  }
  return richText.text;
}

function ensureSVGGenerator(): (() => VElement) {
  let svg: VElement | undefined;
  return function ensureSVG() {
    if (!svg) {
      const measureContainer = document.createElement('div');
      measureContainer.style.zIndex = '0';
      measureContainer.style.position = 'fixed';
      measureContainer.style.left = '100vw';
      measureContainer.style.opacity = '0';
      measureContainer.style.pointerEvents = 'none';
      document.body.append(measureContainer);
      svg = V('<svg></svg>');
      measureContainer.appendChild(svg.node);
    }
    return svg;
  };
}

const ensureSVG = ensureSVGGenerator();

export function setSVGText(svgTextElement: SVGElement | VElement, text: SVGText): void {
  try {
    const element = V(svgTextElement);
    if (typeof text === 'string') {
      element.text(text);
    } else {
      element.text(text.text, text.options);
    }
  } catch (noopError) {
    // noop
  }
}

export function measureSVGText(svgText: SVGText): dia.Size {
  if (!svgText) {
    return {
      width: 0,
      height: 0,
    };
  }
  try {
    const element = V('<text x="0" y="0"></text>');
    setSVGText(element, svgText);
    if (typeof svgText === 'string') {
      element.text(svgText);
    } else {
      element.text(svgText.text, svgText.options);
    }
    const svg = ensureSVG();
    element.appendTo(svg);
    const {
      width,
      height,
    } = element.getBBox();
    element.remove();
    return {
      width,
      height,
    };
  } catch (noopError) {
    // noop
    return {
      width: 0,
      height: 0,
    };
  }
}

export function svgTextToString(svgText: SVGText): string {
  if (!svgText) {
    return undefined;
  }
  if (typeof svgText === 'string') {
    return svgText;
  }
  return svgText.text;
}
