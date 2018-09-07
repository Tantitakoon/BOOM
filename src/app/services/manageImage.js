'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ManageImage = undefined;

var request = require('request');

var data = null;

var encodedImage = null ;

var _Service = require('../utils/class/service');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var ManageImage = exports.ManageImage = function (_Service) {
    _inherits(ManageImage, _Service);


    function ManageImage(url){
        this.url = url;
    }



_createClass(ManageImage, [{ 
    key: 'downloadImg',
    value: function downloadImg() {
        
        request(this.url, function(response) {                                        
        data = new Stream();                                                    
          
        response.on('data', function(chunk) {       
            console.log("response ManageImage");                                
            data.push(chunk);                                                         
            });

            response.on('end', function() {                                           
                encodedImage = new Buffer(data.read(), 'binary').toString('base64');
                
                return  encodedImage;                                                           
            }).end();
         });
       
         
}


}]);
return ManageImage;
}(_Service.Service);