
var map = require('map-stream');
var gutil = require('gulp-util');
var simplecrypt = require('simplecrypt');

//helper function used to create a random string in case no password is given

function randomString(L){
    var s= '';
    var randomchar=function(){
    	var n= Math.floor(Math.random()*62);
    	if(n<10) return n; //1-10
    	if(n<36) return String.fromCharCode(n+55); //A-Z
    	return String.fromCharCode(n+61); //a-z
    }
    while(s.length< L) s+= randomchar();
    return s;
}



var encrypt = function(opts) {

	var opts = opts ? opts : {};

	var pw = opts.password ? true : false; //if false, log the random password later on
	var passwordLength = opts.passwordLength ? opts.passwordLength : 50; //length of random password
	opts.password = pw ? opts.password : randomString(passwordLength); //use random password if none given

  return map(function(file, cb){

  	var encrypted = simplecrypt(opts).encrypt(file.contents);

  	//log the random password if none given
  	if(!pw){
  		var filenameShort = file.path.replace(__dirname.split('node_modules')[0], '');
  		gutil.log(gutil.colors.magenta(filenameShort), 'encryption key:', gutil.colors.cyan(opts.password));
  	};

    file.contents = new Buffer(encrypted);
    cb(null, file);
  });

};



var decrypt = function(opts) {

	var opts = opts ? opts : {};

  return map(function(file, cb){

	var decrypted = simplecrypt(opts).decrypt(file.contents.toString());
	file.contents = new Buffer(decrypted);

  	cb(null, file);
  });

};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
