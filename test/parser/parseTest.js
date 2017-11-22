import { expect } from 'chai';
import fs from 'file-system';

import parse from '../../src/parser/parse';

describe('parser/parse()', () => {
  const wdl = `
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

  it('requires to parse WDL', () => {
    const src = 'workflow foo {}';

    expect(() => parse(src)).to.not.throw(Error);
    return parse(src).then((res) => {
      expect(res.status).to.equal(true);
    });
  });

  it('does not support different formats, only WDL', () => {
    const src = 'foo bar {}';

    return parse(src, { format: 'cwl' }).catch((e) => {
      expect(e).to.be.an('Error');
    });
  });

  it('requires to parse WDL with zip', () => new Promise((resolve, reject) => {
    fs.readFile('test/testData/importsTestArchive.zip', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then(data => parse(wdl, { zipFile: data }).then((res) => {
    expect(res.status).to.equal(true);
  })));

  it('returns with error if source zip is incorrect', () => parse(wdl, { zipFile: 'test' }).catch((e) => {
    expect(e).to.be.an('Error');
  }));
});
