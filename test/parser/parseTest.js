import { expect } from 'chai';

import parse from '../../src/parser/parse';

describe('parser/parse()', () => {

  it('requires to parse WDL', () => {
    const src = 'workflow foo {}';

    expect(() => parse(src)).to.not.throw(Error);
    parse(src).then((res) => {
      expect(res.status).to.equal(true);
    });
  });

  it('does not support different formats, only WDL', () => {
    const src = 'foo bar {}';

    try {
      parse(src, { format: 'cwl' }).then((res) => {
        expect(res.status).to.equal(false);
      });
    } catch (e) {
      expect(e).to.be.an('Error');
    }

  });
});
