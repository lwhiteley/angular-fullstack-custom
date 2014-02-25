'use strict';
var app = require('../../../app-server');
var supertest = require('supertest');
var expect = require('chai').expect;

describe('test spec', function () {
    beforeEach(function(){
      //console.log('before every test');
    });


  it('should have success loading index', function (done) {
      supertest(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.eql(null);
                //$ = cheerio.load(res.text);
                //expect($('html').find('title').text()).to.equal('Angular Log Server');
                done();
            });

  });
});