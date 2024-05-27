import add from '../../add/add';

describe('Add function suite', () => {
  describe('function testing', () => {
    it('expect add(2, 5) to equal 7', () => {
      expect(add(2, 5)).toEqual(7);
    });
  });
});
