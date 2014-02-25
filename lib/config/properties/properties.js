'use strict';

var fs = require('fs');
var util = require('../../util/utilFuncs');
module.exports = function(env){
    var path = './lib/config/properties/';
    var propFile = path + env + '.json';
    var prop = JSON.parse(fs.readFileSync(propFile, 'UTF-8'));
    for(var propt in prop){
        if(util.isSubString('aes', prop[propt])){
            // decrypt and replace here
        }else{
            //console.log('not encrypted');
        }
    }
    return prop;
};