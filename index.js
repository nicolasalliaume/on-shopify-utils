const Auth = require( './auth' );

module.exports = function( auth ) {
	Auth.set( auth );

	return require( './modules/index' );
}