const ShopifyUtils = require( './index' )( {
	domain: "on-sandbox.myshopify.com",

	// private app key
	apiKey: "6577802bf65f43f362635fa26ba63093", 

	// private app password				
	password: "8d84011e56a46a0dacf85a1c7c9a3e5c"		
} );


ShopifyUtils.theme.list().then( themes => console.log( themes ) );