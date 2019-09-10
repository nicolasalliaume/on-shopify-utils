const fs = require( 'fs' );
const path = require( 'path' );
const Auth = require( '../../../auth' );
const getShopify = require( '../../../utils/get-shopify' );
const sanitizeThemeName = require( '../../../utils/sanitize-theme-name' );

module.exports = async function( 
	output,
	filename = 'config.yml',
	includeThemes = [],
	all = false
) {
	if ( ! output ) {
		const error = new Error( `Must specify an output directory for config file` );
		error.statusCode = 500;
		throw error;
	}

	let themes = await getShopify().theme.list();

	includeThemes = includeThemes.map( id => String( id ) );
	
	if ( includeThemes.length > 0 ) {
		themes = themes.filter( ({ id }) => includeThemes.includes( String( id ) ) );
	}

	// check if we have at least one theme
	if ( themes.length === 0 ) {
		const error = new Error( `No themes available. `
			+ `Either your store has no themes, or the following themes `
			+ `do not exist: ${ includeThemes.join(', ') }` );
		error.statusCode = 500;
		throw error;
	}

	const { domain, apiKey, password } = Auth;
	return writeConfig( themes, domain, password, output, filename );
}


/**
 * Writes a config file that contains each of the given
 * themes as an environment to use with theme kit.
 * 
 * @param  {Array} themes   Array of theme objects
 * @param  {String} domain   
 * @param  {String} password 
 * @param  {String} output   
 * @param  {String} filename    
 */
function writeConfig( themes, domain, password, output, filename ) {
	const outPath = path.join( output, filename );

	const template = `{ name }:\n  password: { password }\n  theme_id: { id }\n  store: { domain }`;
	const applyTemplate = ({ id, name }) => (
		template
			.replace( '{ name }', sanitizeThemeName( name ) )
			.replace( '{ id }', id )
			.replace( '{ password }', password)
			.replace( '{ domain }', domain ) 
	);
	
	const content = themes.map( applyTemplate ).join('\n\n');
	const result = themes.map( ({ name }) => sanitizeThemeName( name ) );

	// write file on the indicated output dir, or 
	// on the local dir if not specified
	fs.writeFileSync( outPath, content, 'utf8' );

	return result;
}