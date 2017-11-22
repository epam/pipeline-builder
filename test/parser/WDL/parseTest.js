import { expect } from 'chai';
import sinon from 'sinon';

import Action from '../../../src/model/Action';
import Workflow from '../../../src/model/Workflow';
import Step from '../../../src/model/Step';

import parse from '../../../src/parser/WDL/parse';

describe('parser/WDL/parse()', () => {
  it('does not allow to parse empty data', () => {
    const src = '';

    return parse(src).then(res => expect(res.status).to.equal(false));
  });

  it('allow to parse empty workflow', () => {
    const src = `
workflow foo {
}`;

    return parse(src).then(res => expect(res.status).to.equal(true));
  });

  it('returns with error flag if source syntax is incorrect', () => {
    const src = `
workflow foo {
  File a
  call b
  File c
}

task b {
  File a
}`;

    return parse(src).then(res => expect(res.status).to.equal(false));
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
    return parse(src).then((res) => {
      const parsedFlow = res;

      expect(parsedFlow.status).to.equal(true);
      // TODO: place here the deep comparison for two objects with circular references
      expect(parsedFlow.model[0].name).to.equal(flow.name);
    });
  });

  it('returns with error flag if syntax error was occurred', () => {
    const src = `
fizz buzz {
}`;

    return parse(src).then(res => expect(res.status).to.equal(false));
  });

  it('requires to parse valid wdl script with import statements', () => {
    // language=wdl
    const src = `
import "tasks.wdl"
import "sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call tasks.TaskOne {
        input:
            taskInput = wfInput
    }

    call SubWorkflow.Workflow {
        input:
            wf_input = TaskOne.task_output,
            wf_input_two = wfInput
    }

    call SubWorkflow.Workflow as WorkflowAliasOne {
        input:
            wf_input = TaskOne.task_output,
            wf_input_two = wfInputTwo
    }

    call SubWorkflow.Workflow as WorkflowAliasTwo {
        input:
            wf_input = TaskOne.task_output,
            wf_input_two = wfInputThree
    }

    output {
        String output_1 = WorkflowAliasTwo.output_string
        String? output_2 = Workflow.output_string
        String? output_3 = WorkflowAliasOne.output_string
    }
}`;
    const wdlArray = [{
      name: 'tasks.wdl',
      // language=wdl
      wdl: `
task TaskOne {
  File taskInput

  command <<<
      echo "test"; \\
  >>>

  runtime {
      test: "test"
  }

  output {
      String task_output = "outputString"
  }
}
`,
    }, {
      name: 'sub_workflow.wdl',
      // language=wdl
      wdl: `
workflow Workflow {
  String wf_input
  String wf_input_two

  output {
      String output_string = "outputString"
  }
}`,
    }];

    return parse(src, { wdlArray }).then(res => expect(res.status).to.equal(true));
  });

  it('requires to parse valid wdl script with unused imports and no import\'s wdl presented', () => {
    // language=wdl
    const src = `
import "tasks.wdl"
import "sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call task2

    output {
    }
}

task task2 {
  String str

  output {
    String outStr = str
  }
}`;

    return parse(src).then(res => expect(res.status).to.equal(true));
  });

  it('returns with error when parsing valid wdl script with import statements and no import\'s wdl presented', () => {
    // language=wdl
    const src = `
import "tasks.wdl"
import "sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call tasks.TaskOne {
        input:
            taskInput = wfInput
    }

    call SubWorkflow.Workflow as WorkflowAliasOne {
        input:
            wf_input = TaskOne.task_output,
            wf_input_two = wfInputTwo
    }

    output {
        String? output_3 = WorkflowAliasOne.output_string
    }
}`;

    return parse(src).then(res => expect(res.status).to.equal(false));
  });

  it('returns with error when parsing valid wdl script with "file://" protocol in import statement', () => {
    // language=wdl
    const src = `
import "file://tasks.wdl"
import "sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call tasks.TaskOne {
        input:
            taskInput = wfInput
    }

    call SubWorkflow.Workflow as WorkflowAliasOne {
        input:
            wf_input = TaskOne.task_output,
            wf_input_two = wfInputTwo
    }

    output {
        String? output_3 = WorkflowAliasOne.output_string
    }
}`;

    return parse(src).then(res => expect(res.status).to.equal(false));
  });


  describe('import http', () => {
    let xhr;
    let requests = [];
    beforeEach(() => {
      requests = [];
      xhr = sinon.useFakeXMLHttpRequest();
      global.XMLHttpRequest = xhr;
      xhr.onCreate = (request) => {
        requests.push(request);
      };
    });

    afterEach(() => {
      xhr.restore();
    });

    it('requires to parse valid wdl script with http import statements', () => {
      // language=wdl
      const src = `
import "sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call SubWorkflow.Workflow {
        input:
            wf_input = wfInputTwo,
            wf_input_two = wfInput
    }

    output {
        String output_1 = "test"
    }
}`;
      // language=wdl
      const subWdl = `
workflow Workflow {
  String wf_input
  String wf_input_two

  call convert
  output {
      String output_string = convert.converted
      String output_string_two = "test"
  }
}
task convert {
  File ins

  command {
    convert -fin
  }

  output {
    File converted = "converted.txt"
  }
}`;


      const promise = parse(src, { baseURI: 'http://test.com' });

      requests[0].respond(200, { 'Content-Type': 'text' }, subWdl);

      return promise.then((res) => {
        expect(res.status).to.equal(true);
        expect(res.model[0].name).to.equal('RootWorkflow');
      });
    });

    it('requires to parse valid wdl script with "http://" protocol in import statements', () => {
      // language=wdl
      const src = `
import "http://test.com/sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call SubWorkflow.Workflow {
        input:
            wf_input = wfInputTwo,
            wf_input_two = wfInput
    }

    output {
        String output_1 = "test"
    }
}`;
      // language=wdl
      const subWdl = `
workflow Workflow {
  String wf_input
  String wf_input_two

  call convert
  output {
      String output_string = convert.converted
      String output_string_two = "test"
  }
}
task convert {
  File ins

  command {
    convert -fin
  }

  output {
    File converted = "converted.txt"
  }
}`;


      const promise = parse(src);

      requests[0].respond(200, { 'Content-Type': 'text' }, subWdl);

      return promise.then((res) => {
        expect(res.status).to.equal(true);
        expect(res.model[0].name).to.equal('RootWorkflow');
      });
    });
  });
});
