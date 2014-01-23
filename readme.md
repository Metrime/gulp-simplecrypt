#gulp-simplecrypt

[Simplecrypt](https://github.com/ShowClix/simplecrypt) module as a [Gulp](http://gulpjs.com/) extension.

##Installation

	npm install gulp-simplecrypt

##Usage


	var encrypt = require("gulp-simplecrypt").encrypt;
	var decrypt = require("gulp-simplecrypt").decrypt;

	gulp.src('encrypt.txt')	
		.pipe(encrypt(options))
		.pipe(gulp.dest('encrypted/'))
		
	gulp.src('encrypted.txt')
		.pipe(decrypt(options))
		.pipe(gulp.dest('decrypted/'))
		

##Options

Options get passed to the Simplecrypt module, [so take a look at its options](https://github.com/ShowClix/simplecrypt#api).

##Simplecrypt changes / additions


Originally Simplecrypt defaults to a cryptographically strong, random password, if none given. For my own convenience, I changed this default to a random UTF-8 string (A-Z, a-z, 0-9), which gets logged to the console. 

By default, the length of this string is 50 characters, I created an additional option to change this:

	{
		passwordLength:100
	}
	
Feel free to submit an issue in case you need the original behaviour!