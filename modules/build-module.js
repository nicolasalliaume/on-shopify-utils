const fs = require( 'fs' );
const getChildDirectories = require( '../utils/get-child-directories' );
const { join } = require( 'path' );

module.exports = function( path ) {
	const fullPath = join( __dirname, path );
	const submodules = getChildDirectories( fullPath );
	
	const module = submodules.reduce( ( acc, sm ) => Object.assign( acc,
		{ 
			[ sm ]: require( `${ join( fullPath, sm ) }/index` ) 
		},
	), {} );

	return module;
}