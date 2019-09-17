const zipFolder = require( 'zip-folder' );
const { join } = require( 'path' );
const sanitizeThemeName = require( './sanitize-theme-name' );

module.exports = function( path, name ) {
	const sanitizedName = sanitizeThemeName( name )
	const output = join( process.cwd(), `.tmp.${ sanitizedName }.zip` );
	return new Promise( ( resolve, reject ) => {
		zipFolder( path, output, ( error ) => {
			if ( error ) {
				return reject( error );
			}
			resolve( output );
		} )
	} )
}