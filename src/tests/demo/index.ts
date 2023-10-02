import {
  ContextTypes, OutputParameter, print, Project, Visualizer, WdlDocument, WdlEvent,
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
  console.groupEnd();
  console.groupCollapsed('adding task');
  const task = doc.addTask({
    command: 'echo',
  });
  const call = workflow.addAction({ task, type: ContextTypes.call });
  console.groupEnd();
  call.on(WdlEvent.changed, (ev, sender, args) => {
    console.log('->', ev, sender.toString(), args);
  });
  const o = new OutputParameter({ type: 'File', name: 'o' });
  task.addParameters([o]);
  console.log(`Issues ${doc.issues.length}`);
  console.log(getIssuesDescription(doc.issues));
  // task.command = 'echo 123';
  o.value = '"value"';
  console.log(`Issues ${doc.issues.length}`);
  console.log(getIssuesDescription(doc.issues));
  console.log(project.generateWdl(doc).content);
  console.log(call);
}

export function loadContentsWithCustomProjectScenario(
  visualizer: Visualizer,
  project: Project,
  contents: string,
) {
  console.log(project);
  project.loadDocumentByContents(contents)
    .then((doc) => {
      visualizer.attachTo(doc);
      print(doc, { colored: true });
      try {
        console.log(doc.issues);
        doc.validate(true);
        const generated = project.generateWdl(doc);
        console.log(generated);
        console.log(generated.content);
      } catch (e) {
        console.log(e.message);
      }
    })
    .catch((error) => console.error(error));
}

export function loadContentsScenario(visualizer: Visualizer, contents: string) {
  const project = new Project({
    debug: true,
  });
  loadContentsWithCustomProjectScenario(visualizer, project, contents);
}
