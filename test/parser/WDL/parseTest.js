import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Action from '../../../src/model/Action';
import Workflow from '../../../src/model/Workflow';
import Step from '../../../src/model/Step';

import parse from '../../../src/parser/WDL/parse';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('parser/WDL/parse()', () => {
  it('does not allow to parse empty data', () => {
    const src = '';

    return expect(parse(src)).to.be.rejected;
  });

  it('allow to parse empty workflow', () => {
    const src = `
workflow foo {
}`;

    return expect(parse(src)).to.be.fulfilled;
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
    return expect(parse(src)).to.be.fulfilled;
    // return parse(src).then((res) => {
    //   const parsedFlow = res;
    //
    //   expect(parsedFlow.status).to.equal(true);
    //   // TODO: place here the deep comparison for two objects with circular references
    //   expect(parsedFlow.model[0].name).to.equal(flow.name);
    // });
  });

  it('returns with error flag if syntax error was occurred', () => {
    const src = `
fizz buzz {
}`;

    return expect(parse(src)).to.be.rejected;
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

    if (wfInput) {
      call tasks.TaskOne as Two {
          input:
              taskInput = wfInput
      }
    }

    call task2 
    
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
            wf_input = Two.task_output,
            wf_input_two = wfInputThree
    }

    output {
        String output_1 = WorkflowAliasTwo.output_string
        String? output_2 = Workflow.output_string
        String? output_3 = WorkflowAliasOne.output_string
    }
}

task task2 {
  String str

  output {
    String outStr = str
  }
}
`;
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

  call task2
  
  if (wf_input) {
    call task2 as task3
  }
  
  output {
      String output_string = "outputString"
  }
}

task task2 {
  String str

  output {
    String outStr = str
  }
}
`,
    }];

    return expect(parse(src, { wdlArray })).to.be.fulfilled;
  });

  describe('recursive imports', () => {
    // language=wdl
    const validSrc = `
import "tasks.wdl"
import "sub_workflow.wdl" as SubWorkflow

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    if (wfInput) {
      call tasks.TaskOne {
          input:
              taskInput = wfInput
      }
    }

    if (wfInput) {
      call tasks.TaskOne as Two {
          input:
              taskInput = wfInput
      }
    }

    call task2 
    
    call SubWorkflow.Workflow {
        input:
            wf_input = TaskOne.task_output,
            wf_input_two = wfInput
    }

    call SubWorkflow.Workflow as WorkflowAliasOne {
        input:
            wf_input = Two.task_output,
            wf_input_two = wfInputTwo
    }

    call SubWorkflow.Workflow as WorkflowAliasTwo {
        input:
            wf_input = Two.task_output,
            wf_input_two = wfInputThree
    }

    output {
        String output_1 = WorkflowAliasTwo.output_string
        String? output_2 = Workflow.output_string
        String? output_3 = WorkflowAliasOne.output_string
    }
}

task task2 {
  String str

  output {
    String outStr = str
  }
}
`;
    const validWdlArray = [{
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
import "tasks.wdl"
import "subSubWorkflow.wdl" as SubWorkflow

workflow Workflow {
  String wf_input
  String wf_input_two

  if (wf_input) {
    call task2
  }
  
  if (wf_input) {
    call task2 as task3
  }
  
  call tasks.TaskOne {
      input:
          taskInput = wf_input
  }

  if (wf_input_two) {
    call tasks.TaskOne as Two {
        input:
            taskInput = wf_input_two
    }
  }

  call SubWorkflow.Workflow {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input
  }

  call SubWorkflow.Workflow as SubWorkflowAliasOne 
 {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input_two
  }
  
  output {
      String output_string = "outputString"
      String? output_string_2 = Workflow.output_string
      String? output_string_3 = SubWorkflowAliasOne.output_string
 }
}

task task2 {
  String str

  output {
    String outStr = str
  }
}
`,
    }, {
      name: 'subSubWorkflow.wdl',
      // language=wdl
      wdl: `
import "tasks.wdl" as SubSubTasks
import "subSubSubWorkflow.wdl"

workflow Workflow {
  String wf_input
  String wf_input_two

  call SubSubTasks.TaskOne {
      input:
          taskInput = wf_input
  }

  if (wf_input_two) {
    call SubSubTasks.TaskOne as Two {
        input:
            taskInput = wf_input_two
    }
  }

  call subSubSubWorkflow.Workflow {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input
  }

  call subSubSubWorkflow.Workflow as SubSubWorkflowAliasOne {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input_two
  }

  
  output {
      String output_string = "outputString"
      String? output_string_2 = Workflow.output_string
      String? output_string_3 = SubSubWorkflowAliasOne.output_string
  }
}

`,
    }, {
      name: 'subSubSubWorkflow.wdl',
      // language=wdl
      wdl: `
workflow Workflow {
  String wf_input
  String wf_input_two

  call task3 {
      input:
          taskInput = wf_input
  }

  if (wf_input_two) {
    call task3 as Two {
        input:
            taskInput = wf_input_two
    }
  }

  output {
      String output_string = "outputString"
      String? output_string_2 = task3.outStr
      String? output_string_3 = Two.outStr
  }
}

task task3 {
  String taskInput

  output {
    String outStr = taskInput
  }
}
`,
    }];

    const invalidWdlArray = [{
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
import "tasks.wdl"
import "subSubWorkflow.wdl" as SubWorkflow

workflow Workflow {
  String wf_input
  String wf_input_two

  call task2
  
  if (wf_input) {
    call task2 as task3
  }
  
  call tasks.TaskOne {
      input:
          taskInput = wf_input
  }

  if (wf_input_two) {
    call tasks.TaskOne as Two {
        input:
            taskInput = wf_input_two
    }
  }

  call SubWorkflow.Workflow {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input
  }

  call SubWorkflow.Workflow as SubWorkflowAliasOne 
 {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input_two
  }
  
  output {
      String output_string = "outputString"
      String? output_string_2 = Workflow.output_string
      String? output_string_3 = SubWorkflowAliasOne.output_string
 }
}

task task2 {
  String str

  output {
    String outStr = str
  }
}
`,
    }, {
      name: 'subSubWorkflow.wdl',
      // language=wdl
      wdl: `
import "tasks.wdl" as SubSubTasks
import "subSubSubWorkflow.wdl"

workflow Workflow {
  String wf_input
  String wf_input_two

  call SubSubTasks.TaskOne {
      input:
          taskInput = wf_input
  }

  if (wf_input_two) {
    call SubSubTasks.TaskOne as Two {
        input:
            taskInput = wf_input_two
    }
  }

  call subSubSubWorkflow.Workflow {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input
  }

  call subSubSubWorkflow.Workflow as SubSubWorkflowAliasOne {
      input:
          wf_input = TaskOne.task_output,
          wf_input_two = wf_input_two
  }

  
  output {
      String output_string = "outputString"
      String? output_string_2 = Workflow.output_string
      String? output_string_3 = SubSubWorkflowAliasOne.output_string
  }
}

`,
    }, {
      name: 'subSubSubWorkflow.wdl',
      // language=wdl
      wdl: `
workflowasdsd Workflow {
  String wf_input
  String wf_input_two

  call task3 {
      input:
          taskInput = wf_input
  }

  if (wf_input_two) {
    call task3 as Two {
        input:
            taskInput = wf_input_two
    }
  }

  output {
      String output_string = "outputString"
      String? output_string_2 = task3.outStr
      String? output_string_3 = Two.outStr
  }
}

task task3 {
  String taskInput

  output {
    String outStr = taskInput
  }
}
`,
    }];

    it('requires to parse valid and all sub workflows should be expanded till recursion depth level = 2',
      () => expect(
        parse(validSrc, { wdlArray: validWdlArray, subWfDetailing: ['*'], recursionDepth: 2 }),
      ).to.be.fulfilled);

    it('requires to parse valid and only specified sub workflow should be expanded',
      () => expect(
          parse(validSrc, { wdlArray: validWdlArray, subWfDetailing: ['Workflow'], recursionDepth: 2 }),
        ).to.be.fulfilled);

    it('returns with error when parsing valid wdl script with imports with incorrect sub imports', () => expect(parse(validSrc, { wdlArray: invalidWdlArray, subWfDetailing: ['*'], recursionDepth: 4 })).to.be.rejected);
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

    return expect(parse(src)).to.be.rejected;
  });

  it('returns with error when parsing valid wdl script with import statements and incorrect import\'s wdl presented', () => {
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
  # this is an error: task should be declared outside of workflow
  task task2 {
    String str
  
    output {
      String outStr = str
    }
  }

}
`,
    }];
    return expect(parse(src, { wdlArray })).to.be.rejected;
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
    return expect(parse(src)).to.be.rejected;
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
      return expect(promise).to.be.fulfilled;
      // return promise.then((res) => {
      //   expect(res.status).to.equal(true);
      //   expect(res.model[0].name).to.equal('RootWorkflow');
      // });
    });

    it('requires to parse valid wdl script with "http://" and "https://" protocol in import statements and baseURI', () => {
      // language=wdl
      const src = `
import "http://test.com/sub_workflow" as SubWorkflow
import "https://test.com/tasks"
import "tasks_two"

workflow RootWorkflow {
    File? wfInput
    File? wfInputTwo
    File? wfInputThree

    call tasks.TaskOne {
        input:
            taskInput = wfInput
    }

    call tasks_two.TaskTwo {
        input:
            taskInput = wfInput
    }

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

      // language=wdl
      const subWdlHttps = `
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
`;

      // language=wdl
      const subWdlBaseUri = `
task TaskTwo {
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
`;


      const promise = parse(src, { baseURI: 'http://test.com/' });

      requests[0].respond(200, { 'Content-Type': 'text' }, subWdl);
      requests[1].respond(200, { 'Content-Type': 'text' }, subWdlHttps);
      requests[2].respond(200, { 'Content-Type': 'text' }, subWdlBaseUri);
      return expect(promise).to.be.fulfilled;
      // return promise.then((res) => {
      //   expect(res.status).to.equal(true);
      //   expect(res.model[0].name).to.equal('RootWorkflow');
      // });
    });

    it('return status false if import request respons with 404', () => {
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

      const promise = parse(src);

      requests[0].respond(404, { 'Content-Type': 'text' }, 'Not found');

      return expect(promise).to.be.rejected;
    });
  });
});
