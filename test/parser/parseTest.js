import { expect } from 'chai';

import parse from '../../src/parser/parse';

describe('parser/parse()', () => {

  it('requires to parse WDL', () => {
    const src = `
workflow foo {
}`;

    expect(() => parse(src)).to.not.throw(Error);
    expect(parse(src).status).to.equal(true);
  });

  it('does not support different formats, only WDL', () => {
    const src = `
foo bar {
}`;

    expect(() => parse(src, {
      format: 'cwl',
    })).to.throw(Error);
  });
});
