/**
 * Returns a sanitized version of a theme name to use
 * in the config 
 * 
 * @param  {String} name 
 * @return {String}      
 */
module.exports = function( name ) {
	return name.replace( /\s/g, '-' ).replace( /[^\w-_]/gi, '' ).toLowerCase();
}