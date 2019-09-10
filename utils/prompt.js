const readline = require( 'readline-sync' );

/**
 * Prompts the user for an input. May provide options
 * as second parameter, and a default option. If no
 * default is provided, first option will be used.
 * 
 * @param  {String} message       
 * @param  {Array}  options       
 * @param  {Array}  defaultOption 
 * @return {String}               
 */
module.exports = function( 
	message, 
	options = ['Y/y', 'N/n'], 
	defaultOption = 'y' 
) {
	const optionsStr = options && options.length > 0 
		? `(${ options.join( ', ' ) }) [${ defaultOption || options[0] }]` 
		: '';
		
	return readline.question( `${ message }${ optionsStr }: ` );
}