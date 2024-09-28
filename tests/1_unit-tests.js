const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number input', function(){
        assert.equal(convertHandler.getNum('200 km'), 200, 'should return 200');
    });
    test('should correctly read a decimal number input', function(){
        assert.equal(convertHandler.getNum('0.134 mi'), 0.134, 'should return 0.134');
    });
    test('should correctly read a fractional input', function(){
        assert.equal(convertHandler.getNum('3/2 l'), 1.5, 'should return 1.5');
    });
    test('should correctly read a fractional input with a decimal', function(){
        assert.equal(convertHandler.getNum('8.6/2 gal'), 4.3, 'should return 4.3');
    });
    test('should correctly return an error on a double-fraction', function(){
        assert.throw(() => convertHandler.getNum('3/2/3 lbs'), Error, 'invalid number');
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function(){
        assert.equal(convertHandler.getNum('kg'), 1, 'should return 1');
    });
    test('should correctly read each valid input unit', function(){
        assert.equal(convertHandler.getUnit('3kg'), 'kg', 'should return kg');
    });
    test('should correctly return an error for an invalid input unit', function(){
        assert.throw(() => convertHandler.getUnit('6apple'), Error, 'invalid unit');
    });
    test('should return the correct return unit for each valid input unit', function(){
        assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'should return mi');
    });
    test('should correctly return the spelled-out string unit for each valid input unit', function(){
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'should return kilograms');
    });
    test('should correctly convert gal to L', function(){
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'should return 3.78541');
    });
    test('should correctly convert L to gal', function(){
        assert.equal(convertHandler.convert(3.78541, 'L'), 1, 'should return 1');
    });
    test('should correctly convert mi to km', function(){
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'should return 1.60934');
    });
    test('should correctly convert km to mi', function(){
        assert.equal(convertHandler.convert(1.60934, 'km'), 1, 'should return 1');
    });
    test('should correctly convert lbs to kg', function(){
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 'should return 0.45359');
    });
    test('should correctly convert kg to lbs', function(){
        assert.equal(convertHandler.convert(0.453592, 'kg'), 1, 'should return 1');
    });
});