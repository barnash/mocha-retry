// Generated by CoffeeScript 1.10.0
(function() {
  var Q, times;

  Q = require('q');

  times = 0;

  describe('A non retry suite', function() {
    it('works with a normal, non retry test', function() {
      return true;
    });
    return it('works with a normal, async, non retry test', function(done) {
      return done();
    });
  });

  describe('A suite with tests with retry', function() {
    it(2, 'works with a retried test not async', function() {
      times++;
      if (times % 2 !== 0) {
        throw new Error("not even");
      }
    });
    it(2, 'works with a retried test with a promise', function() {
      times++;
      return Q.fcall(function() {
        if (times % 2 !== 0) {
          throw new Error("not even");
        }
      });
    });
    it(2, 'works with a retried test with callback', function(done) {
      times++;
      if (times % 2 !== 0) {
        return done(new Error("not even"));
      }
      return done();
    });
    it.skip(3, 'a test that will not run', function() {});
    return it.skip('another test that will not run', function() {});
  });

  describe('Some non retry suite with before', function() {
    var valueAll, valueEach;
    valueAll = valueEach = void 0;
    before(function() {
      return valueAll = true;
    });
    beforeEach(function() {
      return valueEach = true;
    });
    after(function() {
      return valueAll = false;
    });
    afterEach(function() {
      return valueEach = false;
    });
    it('works with a normal, non retry test', function() {
      valueEach.should.be["true"];
      return valueAll.should.be["true"];
    });
    return it('works with a normal, async, non retry test', function(done) {
      valueEach.should.be["true"];
      valueAll.should.be["true"];
      return done();
    });
  });

  describe('Some retry suite with before with retry on tests', function() {
    var valueAll, valueEach;
    valueAll = valueEach = void 0;
    before(function() {
      return valueAll = true;
    });
    beforeEach(function() {
      return valueEach = true;
    });
    after(function() {
      return valueAll = false;
    });
    afterEach(function() {
      return valueEach = false;
    });
    it(2, 'works with a retried test not async', function() {
      valueEach.should.be["true"];
      valueAll.should.be["true"];
      times++;
      if (times % 2 !== 0) {
        throw new Error("not even");
      }
    });
    it(2, 'works with a retried test with a promise', function() {
      valueEach.should.be["true"];
      valueAll.should.be["true"];
      times++;
      return Q.fcall(function() {
        if (times % 2 !== 0) {
          throw new Error("not even");
        }
      });
    });
    return it(2, 'works with a retried test with callback', function(done) {
      valueEach.should.be["true"];
      valueAll.should.be["true"];
      times++;
      if (times % 2 !== 0) {
        return done(new Error("not even"));
      }
      return done();
    });
  });

}).call(this);
