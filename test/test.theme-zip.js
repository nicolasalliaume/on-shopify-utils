const assert = require( 'assert' );
const fs = require( 'fs' );
const { join } = require( 'path' );
const moduleUnderTest = require( '../utils/create-theme-zip' );


describe( '#theme-zip', function() {

	let createdFile = null;

	afterEach( function() {
		if ( createdFile !== null ) {
			fs.unlinkSync( createdFile );
			createdFile = null;
		}
	} )

	it( 'should create zip file for theme', async function() {

		const path = join( __dirname, '..', 'utils' );
		createdFile = await moduleUnderTest( path, 'Test Theme' );

		assert.ok( createdFile );
		assert.ok( fs.existsSync( createdFile ) );
	} );

} )