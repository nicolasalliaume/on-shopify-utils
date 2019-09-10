const getShopify = require( '../../../utils/get-shopify' );
const syncTheme = require( '../../../utils/sync-theme' );

module.exports = async function( 
	originId, 
	targetId, 
	files = [], 
	silent = true, 
	force = false 
) {
	const shopify = getShopify();

	// get original and target themes to have their names
	const sourceTheme = await shopify.theme.get( sourceId );
	const targetTheme = await shopify.theme.get( targetId );

	const assets = ( await shopify.asset.list( sourceId ) ).map( a => a.key );

	// check if the files listed (if any) exist on the source theme.
	// Throw an exception and terminate if one doesn't.
	if ( files.length > 0 ) {
		for ( var i = 0; i < files.length; i++ ) {
			if ( ! assets.includes( files[ i ] ) ) {
				const error = new Error( 
					`Asset ${ files[ i ] } does not exist in theme ${ sourceTheme.name }` 
				);
				error.statusCode = 404;
				throw error;
			}
		}
	}

	// copy the assets into the new theme
	const keysToCopy = files.length > 0 ? files : assets;
	await syncTheme( sourceTheme, targetTheme, keysToCopy, silent, force );

	return keysToCopy;	
}