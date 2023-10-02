import {
  ContextTypes,
} from '../context-types';
import { IWdlEntity } from '../types';
import WdlEntity from '../base/wdl-entity';
import Command from '../task/command';
import Expression from '../expression';
import Parameter from '../parameter';
import Import from '../import';
import Call from '../call';
import WdlDocument from '../document';
import Executable from '../executable';
import Struct from '../struct';
import StructProperty from '../struct/struct-property';

const PRINT_COLORS = {
  [ContextTypes.workflow]: '#033186',
  [ContextTypes.import]: '#330386',
  [ContextTypes.task]: '#4f0394',
  [ContextTypes.call]: '#126501',
  [ContextTypes.conditional]: '#810259',
  [ContextTypes.scatter]: '#810259',
  [ContextTypes.declaration]: '#111111',
  [ContextTypes.input]: '#005c65',
  [ContextTypes.output]: '#005b40',
  [ContextTypes.command]: '#ab2e2e',
  default: '#333333',
  uuid: '#999999',
};

interface IPrintOptions {
  collapsed?: boolean;
  withParent?: boolean;
  colored?: boolean;
  uuid?: boolean;
  expression?: boolean;
  children?: boolean;
  instance?: boolean;
}

function styleToString(...style) {
  return Object.entries(style.reduce((s, c) => ({ ...s, ...(c || {}) }), {}))
    .map(([name, value]) => `${name}: ${value};`).join('');
}

const COLORED = false;

function getStyleForEntity(entity: IWdlEntity, style = {}, colored = COLORED): string {
  if (!colored) {
    return styleToString(style);
  }
  const color = PRINT_COLORS[entity.contextType] || PRINT_COLORS.default;
  return styleToString(style, { color });
}

export default function print(
  entity: IWdlEntity,
  options?: IPrintOptions,
): void {
  const {
    collapsed = false,
    withParent = false,
    colored,
    uuid = false,
    expression = true,
    children: printChildren = true,
    instance = false,
  } = options || {};
  const defaultStyle = styleToString({ 'font-weight': 'normal' });
  const parts: (string | { text: string, style: string })[] = [];
  const addEntityNameParts = (e: IWdlEntity): void => {
    if (!(entity instanceof StructProperty)) {
      parts.push({
        text: e.contextType,
        style: getStyleForEntity(e, { 'font-weight': 'normal' }, colored),
      });
    }
    if (e.name) {
      if (e instanceof Parameter && e.type) {
        parts.push(e.type);
      }
      parts.push({
        text: e.name,
        style: getStyleForEntity(e, { 'font-weight': e.alias ? 'normal' : 'bold' }, colored),
      });
    }
    if (e.name && e.alias) {
      parts.push('as');
      parts.push({
        text: e.alias,
        style: getStyleForEntity(e, { 'font-weight': 'bold' }, colored),
      });
    }
    if (expression && e instanceof Expression && e.value) {
      parts.push('=');
      parts.push(e.value);
    }
    if (uuid) {
      parts.push({
        text: `#${e.uuid}`,
        style: styleToString({ 'font-weight': 'normal' }),
      });
    }
  };
  if (
    withParent
    && entity instanceof WdlEntity
    && entity.parent
  ) {
    addEntityNameParts(entity.parent);
    parts.push('>');
  }
  addEntityNameParts(entity);
  const printGroup = <T>(
    group: string,
    children: T[],
    groupOptions?: IPrintOptions & { printer?: (o: T, options: IPrintOptions) => void; },
  ): boolean => {
    const merged = {
      ...(options || {}),
      ...(groupOptions || {}),
    };
    const {
      collapsed: groupCollapsed = collapsed,
      printer = (o: T) => console.log(o),
    } = merged;
    if (children.length > 0) {
      const nameCorrected = `${group} (${children.length})`;
      if (groupCollapsed) {
        console.groupCollapsed(nameCorrected);
      } else {
        console.group(nameCorrected);
      }
      children.forEach((child) => printer(child, merged));
      console.groupEnd();
      return true;
    }
    return false;
  };
  const printGroupOfEntities = (
    group: string,
    entities: IWdlEntity[],
    groupOptions?: IPrintOptions,
  ): boolean => printGroup(
    group,
    entities,
    {
      ...(groupOptions || {}),
      printer: print,
    },
  );
  const getChildrenOfType = (...type: ContextTypes[]): IWdlEntity[] => {
    if (entity instanceof WdlEntity) {
      if (type.length === 0) {
        return entity.children;
      }
      return entity.children.filter((child) => type.includes(child.contextType));
    }
    return [];
  };
  const getChildrenNotOfType = (...type: ContextTypes[]): IWdlEntity[] => {
    if (entity instanceof WdlEntity) {
      if (type.length === 0) {
        return [];
      }
      return entity.children.filter((child) => !type.includes(child.contextType));
    }
    return [];
  };
  const openGroup = (isGroup = true): (() => void) => {
    const text = parts
      .map((part) => (typeof part === 'string' ? part : part.text))
      .map((part) => `%c${part}`)
      .join(' ');
    const styles = parts
      .map((part) => (typeof part === 'string' ? { style: undefined } : part))
      .map(({ style: partStyle }) => partStyle || defaultStyle);
    if (isGroup || instance) {
      if (collapsed) {
        console.groupCollapsed(text, ...styles);
      } else {
        console.group(text, ...styles);
      }
      if (instance) {
        console.log(entity);
      }
      return () => console.groupEnd();
    }
    console.log(text, ...styles);
    return () => {};
  };
  let closeGroup = () => {};
  if (!printChildren) {
    closeGroup = openGroup(false);
  } else if (entity instanceof Import) {
    closeGroup = openGroup(!!entity.importedDocument);
    if (entity.importedDocument) {
      print(entity.importedDocument, options);
    }
  } else if (entity instanceof StructProperty) {
    closeGroup = openGroup(false);
  } else if (entity instanceof Struct) {
    closeGroup = openGroup(entity.properties.length > 0);
    entity.properties.forEach((property) => print(property, options));
  } else if (entity instanceof Expression) {
    closeGroup = openGroup(entity.outboundConnections.length > 0);
    printGroupOfEntities(
      'outbound connections',
      entity.outboundConnections,
      {
        collapsed: true,
        withParent: true,
        colored,
      },
    );
  } else if (entity instanceof Command) {
    closeGroup = openGroup(!!entity.command);
    if (entity.command) {
      entity.command.split('\n').map((line) => console.log(
        `%c${line}`,
        getStyleForEntity(entity, { 'font-size': '10px' }),
      ));
    }
  } else if (entity instanceof WdlEntity) {
    closeGroup = openGroup(
      entity.children.length > 0
      || (entity instanceof Call && !!entity.executable),
    );
    if (entity instanceof WdlDocument) {
      console.log('version:', entity.version);
    }
    if (entity instanceof Call && entity.executable) {
      print(entity.executable, {
        ...(options || {}),
        withParent: true,
      });
    }
    const usedTypes: Set<ContextTypes> = new Set();
    const printData = (group: string, ...type: ContextTypes[]): void => {
      type.forEach((t) => usedTypes.add(t));
      printGroupOfEntities(
        group,
        getChildrenOfType(...type),
        { collapsed: true, withParent: false },
      );
    };
    printData('imports', ContextTypes.import);
    printData('structs', ContextTypes.struct);
    if (entity instanceof Executable) {
      usedTypes.add(ContextTypes.declaration);
      usedTypes.add(ContextTypes.input);
      usedTypes.add(ContextTypes.output);
      printGroupOfEntities(
        'inputs',
        entity.getActionInputs(),
        { collapsed: true, withParent: false },
      );
      printGroupOfEntities(
        'declarations',
        entity.getActionDeclarations(),
        { collapsed: true, withParent: false },
      );
      printGroupOfEntities(
        'outputs',
        entity.getActionOutputs(),
        { collapsed: true, withParent: false },
      );
    } else {
      printData('inputs', ContextTypes.input);
      printData('declarations', ContextTypes.declaration);
      printData('outputs', ContextTypes.output);
    }
    printData('meta', ContextTypes.metaElement);
    printData('runtime', ContextTypes.runtime);
    getChildrenNotOfType(...usedTypes)
      .forEach((child) => print(child, {
        ...(options || {}),
        collapsed: true,
        withParent: false,
      }));
  } else {
    closeGroup = openGroup(false);
  }
  closeGroup();
}
