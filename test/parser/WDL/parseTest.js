import { expect } from 'chai';

import Action from '../../../src/model/Action';
import Workflow from '../../../src/model/Workflow';
import Step from '../../../src/model/Step';

import parse from '../../../src/parser/WDL/parse';

describe('parser/WDL/parse()', () => {

  it('does not allow to parse empty data', () => {
    const src = '';

    expect(parse(src).status).to.equal(false);
  });

  it('allow to parse empty workflow', () => {
    const src = `
workflow foo {
}`;

    expect(parse(src).status).to.equal(true);
  });

  it('throws WDLParserError if source syntax is incorrect', () => {
    const src = `
workflow foo {
  File a
  call b
  File c
}

task b {
  File a
}`;

    expect(parse(src).status).to.equal(false);
  });

  it('requires to parse valid wdl script', () => {

    const flow = new Workflow('example1', {
      i: {
        a: {
          type: 'File',
        },
        b: {
          type: 'File',
        },
      },
      o: {
        result: {
          type: 'File',
        },
      },
    });

    const convert = new Action('convert', {
      i: {
        in: {
          type: 'File',
        },
      },
      o: {
        converted: {
          type: 'File',
          default: '"converted.txt"',
        },
      },
      data: {
        command: {
          string: 'convert -fin',
          style: '{',
        },
      },
    });

    const a = flow.add(new Step('convert_a', convert, {
      i: {
        in: flow.i.a,
      },
    }));

    const b = flow.add(new Step('convert_b', convert));
    b.i.in.bind(flow.i.b);

    const c = flow.add(new Step('merge', {
      i: {
        in1: {
          type: 'File',
          bind: a.o.converted,
        },
        in2: {
          type: 'File',
          bind: b.o.converted,
        },
      },
      o: {
        merged: {
          type: 'File',
          default: '"file.txt"',
        },
      },
      data: {
        command: {
          string: 'merge -fin1 -fin2',
          style: '{',
        },
      },
    }));

    flow.o.result.bind(c.o.merged);

    const src = `
workflow example1 {
  File a
  File b

  call convert as convert_a {
    input:
      in = a,
  }

  call convert as convert_b {
    input:
      in = b,
  }

  call merge {
    input:
      in1 = convert_a.converted,
      in2 = convert_b.converted,
  }

  output {
    File result = merge.merged
  }
}

task convert {
  File in

  command {
    convert -fin
  }

  output {
    File converted = "converted.txt"
  }
}

task merge {
  File in1
  File in2

  command {
    merge -fin1 -fin2
  }

  output {
    File merged = "file.txt"
  }
}
`;
    const parsedFlow = parse(src);
    expect(parsedFlow.status).to.equal(true);
    // TODO: place here the deep comparison for two objects with circular references
    expect(parsedFlow.model[0].name).to.equal(flow.name);
  });

  it('throws the error message if syntax error was occured', () => {
    const src = `
fizz buzz {
}`;

    expect(parse(src).status).to.equal(false);
  });

});
