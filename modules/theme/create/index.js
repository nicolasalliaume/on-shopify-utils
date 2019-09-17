const getShopify = require( '../../../utils/get-shopify' );

// upload files to theme

module.exports = async function( name, silent = false ) {
	if ( ! name ) {
		const error = new Error( `Must specify a name for the theme.` );
		error.statusCode = 500;
		throw error;
	}

	return await getShopify().theme.create( { name, role: 'unpublished' } );
}