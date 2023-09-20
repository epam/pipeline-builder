import { dia } from 'jointjs';

/**
 * @typedef {Object} LinkSimplified
 * @property {string} source - link source element
 * @property {string} target - link target element
 */

/**
 * @typedef {Object} ElementLinks
 * @property {LinkSimplified[]} links
 * @property {Set<string>} childrenIdentifiers
 * @property {joint.dia.Element} element
 */

export interface ILinkSimplified {
  source: dia.Cell.ID;
  target: dia.Cell.ID;
}

export interface IElementLinks {
  links: ILinkSimplified[];
  childrenIdentifiers: Set<dia.Cell.ID>;
  element: dia.Element;
}

/**
 * Returns all inbound / outbound connections of the element and it's children elements.
 *
 * Example:
 * Element `A` has children `A.B` and `A.C`.
 * There are connections to other elements `X` and `Y`:
 * - `A -> X`,
 * - `A.B -> X`,
 * - `A.B -> A.C`,
 * - `A.C -> Y`.
 *
 * This function will return:
 * - connections: `A -> X`, `A.B -> X`, `A.C -> Y` (internal connection `A.B -> A.C` is ignored);
 * - self & children identifiers: `A`, `A.B`, `A.C`.
 *
 * @param {joint.dia.Element} element
 * @returns {IElementLinks}
 */
function getElementLinks(element: dia.Element): IElementLinks {
  if (!element) {
    return {
      childrenIdentifiers: new Set(),
      links: [],
      element,
    };
  }
  const links = element.graph.getLinks();
  const innerCellsIdentifiers = [
    element.id,
    ...element
      .getEmbeddedCells({ deep: true })
      .filter((cell) => !cell.isLink())
      .map((cell) => cell.id),
  ];
  const names = new Set(innerCellsIdentifiers);
  const external: ILinkSimplified[] = links
    .filter((link) => names.has(link.source().id) || names.has(link.target().id))
    .map((link) => {
      const source = link.source().id;
      const target = link.target().id;
      return {
        source,
        target,
      };
    })
    .filter((link) => link.source !== link.target);
  return {
    links: external,
    childrenIdentifiers: names,
    element,
  };
}

export default getElementLinks;
