'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const converter = new ConvertHandler();

    var initNum, initUnit, errors = [];

    try {
      initNum = converter.getNum(req.query.input);
    } catch (e) {
      errors.push(e.message);
    }
    try {
      initUnit = converter.getUnit(req.query.input);
    } catch (e) {
      errors.push(e.message);
    }
    var returnUnit = converter.getReturnUnit(initUnit);
    var returnNum = converter.convert(initNum,initUnit);
    var string = converter.getString(initNum, initUnit, returnNum, returnUnit);

    let occr = 0;
    if (Object.keys(errors).length > 0) res.json(errors.join(' and ').replace(/invalid /g, match => ++occr === 2 ? '' : match));
    else  res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    });
  });

};
