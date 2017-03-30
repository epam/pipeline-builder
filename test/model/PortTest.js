import { expect } from 'chai';
import Port from '../../src/model/Port';


describe('model/Port', () => {

  function createP1() {
    return new Port('p1', null, { type: 'int' });
  }

  function createP2() {
    return new Port('p1', null, { type: 'string' });
  }

  function createConst() {
    return { value: '5' };
  }

  describe('bind', () => {
    it('binds both ports', () => {
      const p1 = createP1();
      const p2 = createP2();

      p1.bind(p2);
      expect(p2.outputs).to.have.lengthOf(1);
      expect(p1.inputs).to.have.lengthOf(1);

      const conn = p1.inputs[0];
      expect(conn).to.equal(p2.outputs[0]);
      expect(conn).to.have.property('from', p2);
      expect(conn).to.have.property('to', p1);
      expect(conn.isValid()).to.be.true;
    });

    it('binds constants', () => {
      const p1 = createP1();
      const obj = createConst();
      p1.bind(obj);

      expect(p1.inputs).to.have.lengthOf(1);
      const conn = p1.inputs[0];
      expect(conn).to.have.property('from', obj);
      expect(conn).to.have.property('to', p1);
      expect(conn.isValid()).to.be.true;
    });
  });

  describe('.unbind()', () => {
    it('unbinds ports', () => {
      const p1 = createP1();
      const p2 = createP2();
      const conn = p1.bind(p2);
      p1.unbind(p2);

      expect(conn.isValid()).to.be.false;
      expect(p1.inputs).to.be.empty;
      expect(p2.outputs).to.be.empty;
    });

    it('unbinds multiple port connections', () => {
      const p1 = createP1();
      const p2 = createP2();
      const conn = p1.bind(p2);
      const conn1 = p1.bind(p2);
      p1.unbind(p2);
      p1.unbind(p2);

      expect(conn.isValid()).to.be.false;
      expect(conn1.isValid()).to.be.false;
      expect(p1.inputs).to.be.empty;
      expect(p2.outputs).to.be.empty;
    });

    it('unbinds constants', () => {
      const p1 = createP1();
      const obj = createConst();
      const conn = p1.bind(obj);
      p1.unbind(obj);

      expect(conn.isValid()).to.be.false;
      expect(p1.inputs).to.be.empty;
    });
  });

  describe('.unbindAll()', () => {
    it('unbinds everything', () => {
      const p1 = createP1();
      const p2 = createP2();
      const obj = createConst();

      const conn = p1.bind(p2);
      const conn1 = p1.bind(obj);
      p1.unbindAll();

      expect(conn.isValid()).to.be.false;
      expect(conn1.isValid()).to.be.false;
      expect(p1.inputs).to.be.empty;
      expect(p2.outputs).to.be.empty;
    });
  });
});
