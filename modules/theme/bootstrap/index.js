const getShopify = require( '../../../utils/get-shopify' );
const themesList = require( '../../../utils/themes-list' );

module.exports = async function( names = [], all = false ) {
	if ( all ) {
		names = themesList;
	}
	else {
		if ( typeof names === 'string' ) {
			names = [ names ];
		}
	}

	// check if there're themes to bootstrap
	if ( names.length === 0 ) {
		const error = new Error( '👎  Must specify at least one theme.' );
		error.statusCode = 500;
		throw error;
	}
	
	// install all themes sequencially
	const results = [];
	for ( var i = 0; i < names.length; i++ ) {
		const theme = await installTheme( names[ i ] );
		results.push( theme );
	}

	return results;
}


async function installTheme( _name ) {
	const name = _name.toLowerCase();

	// verify if the theme exists
	if ( ! themesList.includes( name ) ) {
		const error = new Error( `Theme ${ name } is not available.` );
		error.statusCode = 500;
		throw error;
	}

	const url = `https://s3.amazonaws.com/shopify-cli-store/${ name }.zip`;
	const capitalizedName = name.charAt( 0 ).toUpperCase() + name.slice( 1 );

	const theme = {
		name: capitalizedName,
		src: url,
		role: 'unpublished',
	}

	return await getShopify().theme.create( theme );
}