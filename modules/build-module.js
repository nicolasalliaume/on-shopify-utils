const fs = require( 'fs' );
const { join } = require( 'path' );

module.exports = function( path ) {
	const fullPath = join( __dirname, path );

	const submodules = fs.readdirSync( fullPath )
		.filter( s => fs.lstatSync( join( fullPath, s ) ).isDirectory() );

	const module = submodules.reduce( ( acc, sm ) => Object.assign( acc,
		{ 
			[ sm ]: require( `${ join( fullPath, sm ) }/index` ) 
		},
	), {} );

	return module;
}