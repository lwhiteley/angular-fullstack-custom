'use strict';

describe('test spec', function () {
    beforeEach(function(){
      console.log('before every test')
    });


  it('should be truthy', function (done) {
    var truth = true;
    truth.should.equal(true);
    done();
  });
});