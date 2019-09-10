const getShopify = require( '../../../utils/get-shopify' );

module.exports = async function( name, field ) {
	let themes = await getShopify().theme.list();

	if ( name ) {
		themes = themes.filter( t => t.name == name );
	}

	if ( field ) {
		if ( themes.length === 1 ) {
			return themes[ 0 ][ field ];
		}
		else {
			const error = new Error( 
				`Cannot return value for ${ field } when `
				+ `${ themes.length } results exist.` );
			error.statusCode = 500;
			throw error;
		}
	}

	return themes;
}