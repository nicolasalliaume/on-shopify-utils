const getShopify = require( '../../../utils/get-shopify' );

module.exports = function( id ) {
	return getShopify().theme.update( id, { role: 'main' } );
}