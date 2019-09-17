const assert = require( 'assert' );
const moduleUnderTest = require( '../modules/theme/sync/index' );
const themesList = require( '../modules/theme/list/index' );

/*
 * Test auth
 */
const auth = require( '../auth' ).set( require( './sample-data/auth.json' ) );

describe.only( '#theme-sync', function() {

	this.timeout( 30000 );

	it( 'should sync two themes', async function() {

		const themes = await themesList();
		if ( themes.length < 2 ) {
			throw new Error( 'Cannot test with less than 2 themes in the store' );
		}
		const source = themes[ 0 ].id;
		const target = themes[ 1 ].id;

		const result = await moduleUnderTest( source, target, [ 'config/settings_schema.json' ] );

		assert.equal( result.length, 1 )
		assert.equal( result[ 0 ], 'config/settings_schema.json' );

	} )

} )