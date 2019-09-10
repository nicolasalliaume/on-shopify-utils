const getShopify = require( '../../../utils/get-shopify' );
const syncTheme = require( '../../../utils/sync-theme' );

module.exports = async function( id, _name, silent = true, force = false ) {
	const shopify = getShopify();

	// get original theme to have its name
	const originalTheme = await shopify.theme.get( id );
	const name = _name || `Copy of ${ originalTheme.name }`;

	const newTheme = await shopify.theme.create( { name, role: 'unpublished' } );
	const assets = ( await shopify.asset.list( id ) ).map( a => a.key );

	// copy all the assets into the new theme
	const syncResult = await syncTheme( 
		originalTheme, 
		newTheme, 
		assets, 
		silent, 
		force
	);

	return newTheme;
}