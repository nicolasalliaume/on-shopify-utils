const getShopify = require( '../../../utils/get-shopify' );

module.exports = async function( id, name ) {
	const shopify = getShopify();
	const theme = await shopify.theme.get( id );

	if ( ! theme ) {
		const error = new Error( `Theme with id ${ id } not found.` );
		error.statusCode = 404;
		throw error;
	}

	const newName = name.replace( /%name%/gi, theme.name ).replace( /%id%/gi, theme.id );
	return shopify.theme.update( id, { name: newName } );
}