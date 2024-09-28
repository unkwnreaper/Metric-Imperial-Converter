const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

      test('Test Convert a valid input', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10l')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum, 10)
            assert.equal(res.body.initUnit,'L')
            assert.equal(res.body.returnNum, 2.64172)
            assert.equal(res.body.returnUnit,'gal')
            assert.equal(res.body.string,'10 liters converts to 2.64172 gallons')
            done();
          });
      });

      test('Test Convert an invalid unit', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=32g')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '"invalid unit"');
            done();
          });
      });

      test('Test Convert an invalid number', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kg')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '"invalid number"');
            done();
          });
      });

      test('Test Convert an invalid number and unit', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '"invalid number and unit"');
            done();
          });
      });
      
      test('Test Convert with no number', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=lbs')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum,1)
            assert.equal(res.body.initUnit,'lbs')
            assert.equal(res.body.returnNum,0.45359)
            assert.equal(res.body.returnUnit,'kg')
            assert.equal(res.body.string,'1 pounds converts to 0.45359 kilograms')
            done();
          });
      });
});
