const Shopify = require( 'shopify-api-node' );
const Auth = require( '../auth' );

/**
 * Returns a new instance of the Shopify API object.
 * 
 * @param  {Object} command The parsed command object
 * @return {Object}         
 */
module.exports = function() {
	const { domain, apiKey, password } = Auth;

	if ( !domain || !apiKey || !password ) {
		throw new Error( 'Missing domain, api key or password' );
	}

	const shopName = domain.replace( '.myshopify.com', '' ).replace( 'https://', '' );
	return new Shopify( { shopName, apiKey, password } );
}