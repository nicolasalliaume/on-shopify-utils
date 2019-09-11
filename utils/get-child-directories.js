const fs = require( 'fs' );
const { join } = require( 'path' );

module.exports = function( path ) {
	return fs.readdirSync( path )
		.filter( s => fs.lstatSync( join( path, s ) ).isDirectory() );
}