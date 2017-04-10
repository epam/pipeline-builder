import _ from 'lodash';

import Action from '../../../model/Action';
import { extractExpression, extractType, extractMetaBlock } from '../utils/utils';

/** Class representing a Task object of WDL script entity */
export default class Task {
  /**
   * Create a Task object with all desired properties.
   * @param {ast} taskNode - Root task ast node of parsed WDL ast tree
   */
  constructor(taskNode) {
    this.name = taskNode.name.source_string;

    this.desc = {
      i: {},
      o: {},
      data: {},
    };

    this.processDeclarations(taskNode.declarations);
    this.processOutputs(taskNode);

    Task.filterValues(taskNode.sections.list, 'meta').forEach((item) => {
      extractMetaBlock(item, 'meta', this.desc);
    });

    Task.filterValues(taskNode.sections.list, 'runtime').forEach((item) => {
      extractMetaBlock(item, 'runtime', this.desc);
    });

    Task.filterValues(taskNode.sections.list, 'parameterMeta').forEach((item) => {
      extractMetaBlock(item, 'parameterMeta', this.desc);
    });
  }

  /**
   * Returns Action object built from Task entity parsed before
   * @param {object=} command - Source command description
   * @param {Object.<string>} [command.command] - Source command string
   * @param {Object.<string>} [command.type] - Source command type (style)
   */
  constructAction(command) {
    if (command) {
      _.set(this.desc, 'data.command', command.command);
      if (command.type && command.type !== '{') {
        _.set(this.desc, 'data.commandStyle', command.type);
      }
    }

    return new Action(this.name, this.desc);
  }

  processDeclarations(ast) {
    ast.list.forEach((v) => {
      this.desc.i[v.attributes.name.source_string] = {
        type: extractType(v.attributes.type),
      };

      const str = extractExpression(v.attributes.expression).string;
      if (str !== '') {
        this.desc.i[v.attributes.name.source_string].default = str;
      }
    });
  }

  processOutputs(ast) {
    ast.sections.list.filter(item => item.name.toLowerCase() === 'outputs')
      .map(item => item.attributes.attributes.list)
      .reduce((i, j) => i.concat(j), [])
      .forEach((v) => {
        const node = v.attributes;
        this.desc.o[node.name.source_string] = {
          type: extractType(node.type),
          default: extractExpression(node.expression).string,
        };
      });
  }

  static filterValues(list, filter) {
    return list.filter(item => item.name.toLowerCase() === filter.toLowerCase())
      .map(item => item.attributes.map.list);
  }
}
