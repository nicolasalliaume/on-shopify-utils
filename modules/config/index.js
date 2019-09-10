const fs = require( 'fs' );
const path = require( 'path' );

module.exports = function( 
	domain, 
	apiKey, 
	password, 
	output, 
	filename = '.env.cli' 
) {
	if ( ! output ) {
		const error = new Error( `Must specify an output directory for config file.` );
		error.statusCode = 500;
		throw error;
	}

	try {
		// remove previous .env.cli if any
		fs.unlinkSync( path.join( output, filename ) );
	}
	catch ( e ) { /* do nothing, it's safe */ }

	const fullPath = path.join( '.', '.env.cli' );

	const content = `DOMAIN=${ domain }\nKEY=${ apiKey }\nPASSWORD=${ password }`;
	fs.writeFileSync( fullPath, content );

	return fullPath;
}