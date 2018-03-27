import fs from 'file-system';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import parse from '../../src/parser/parse';

chai.use(chaiAsPromised);
const { expect } = chai;

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

    return expect(parse(src)).to.be.fulfilled;
  });

  it('does not support different formats, only WDL', () => {
    const src = 'foo bar {}';
    return expect(parse(src, { format: 'cwl' })).to.be.rejectedWith('Unsupported format: cwl');
  });

  it('requires to parse WDL with zip', () => expect(new Promise((resolve, reject) => {
    fs.readFile('test/testData/importsTestArchive.zip', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then(data => parse(wdl, { zipFile: data, subWfDetailing: ['*'], recursionDepth: 10 }))).to.be.fulfilled);

  it('returns with error if source zip is incorrect', () =>
    expect(parse(wdl, { zipFile: 'test' })).to.be.rejectedWith('Error'));

  it('returns with error if no wdl presented', () =>
    expect(parse('')).to.be.rejected);
});
