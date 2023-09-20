import {
  ContextTypes, InputParameter, OutputParameter, print, Project, Visualizer, WdlDocument, WdlEvent,
} from '../../pipeline';
import { getIssuesDescription } from '../../model/validation';

export function createDocumentScenario(visualizer: Visualizer) {
  const project = new Project({
    debug: false,
  });
  const doc = new WdlDocument({
    project,
    name: 'WdlDocument',
  });
  console.log(doc);
  doc.on(
    '*',
    (event, sender, ...args) => console.log(`[${sender.toString()}]: ${event}`, ...args),
  );
  console.groupCollapsed('prepare');
  visualizer.attachTo(doc);
  const workflow = doc.addWorkflow();
  workflow.addParameters([new InputParameter({ name: 'in1', type: 'Array[File]' })]);
  console.groupEnd();
  console.groupCollapsed('adding task');
  const task = doc.addTask({
    command: '',
  });
  const task2 = doc.addTask({
    command: '',
  });
  console.groupEnd();
  console.groupCollapsed('adding scatter');
  const scatter = workflow.addAction({ type: ContextTypes.scatter });
  console.groupEnd();
  console.groupCollapsed('adding action to scatter');
  const call = scatter.addAction({ task, type: ContextTypes.call });
  scatter.addAction({ task, type: ContextTypes.call });
  task.addParameters([
    new OutputParameter({
      name: 'o',
    }),
  ]);
  scatter.addAction({ task: task2, alias: 'Task2', type: ContextTypes.call });
  console.groupEnd();
  call.on(WdlEvent.changed, (ev, sender, args) => {
    console.log('->', ev, sender.toString(), args);
  });
  console.log(`Issues ${doc.issues.length}`);
  console.log(getIssuesDescription(doc.issues));
  // task.command = 'echo 123';
  console.log(`Issues ${doc.issues.length}`);
  console.log(getIssuesDescription(doc.issues));
  console.log(project.generateWdl(doc).content);
}

export function loadContentsScenario(visualizer: Visualizer, contents: string) {
  const project = new Project({
    debug: true,
  });
  project.loadDocumentByContents(contents)
    .then((doc) => {
      visualizer.attachTo(doc);
      print(doc, { colored: true });
      try {
        console.log(doc.issues);
        doc.validate(true);
        console.log(project.generateWdl(doc));
      } catch (e) {
        console.log(e.message);
      }
    })
    .catch((error) => console.error(error));
}
