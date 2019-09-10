const getShopify = require( '../../../utils/get-shopify' );

module.exports = async function( ids = [], all = false ) {
	const shopify = getShopify();

	if ( all ) {
		// fetch all non-active theme ids
		const themes = await shopify.theme.list();
		ids = themes.filter( t => t.role !== 'main' ).map( t => t.id );
	}
	else {
		if ( typeof ids === 'number' ) {
			ids = [ ids ];
		}
	}

	// check if there're themes to delete
	if ( ids.length === 0 ) {
		const error = new Error( '👎  No themes that can be deleted are available.' );
		error.statusCode = 500;
		throw error;
	}

	return Promise.all( ids.map( id => shopify.theme.delete( id ) ) );
}