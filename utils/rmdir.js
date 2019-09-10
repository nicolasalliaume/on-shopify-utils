const rimraf = require( 'rimraf' );

/**
 * Deletes a dir using `rm -rf`. Returns a promise.
 * 
 * @param  {String} path 
 * @return {Promise}      
 */
module.exports = function( path ) {
	return new Promise( ( resolve, reject ) => {
		rimraf( path, function( error ) { 
			if ( error ) return reject( error );
			resolve();
		} )
	} )
}