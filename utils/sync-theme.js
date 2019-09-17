const fs = require( 'fs' );
const getShopify = require( './get-shopify' );
const prompt = require( './prompt' );
const rmdir = require( './rmdir' );
const sanitizeThemeName = require( './sanitize-theme-name' );
const themeKit = require( '@shopify/themekit' );
const Auth = require( '../auth' );
const path = require( 'path' );

module.exports = async function( 
	sourceTheme, 
	targetTheme,  
	assetKeys,
	silent = true,
	force = false,
	_syncDir = null,
) {
	const syncDir = _syncDir || path.join( __dirname, '..', '.sync' );

	!silent && console.log( 
		`⌛️  Copying assets from source theme ${ sourceTheme.name }...\n`
		`	 Using temp directory "${ syncDir }"`
	);

	// if sync dir already exists, either some other process is running
	// at the same time, or a prev process was interrupted.
	if ( fs.existsSync( syncDir ) ) {
		if ( !promptDeletePrevSync() ) {
			throw new Error( 'Process aborted' );
		}
		// user accepted to delete dir
		await rmdir( syncDir );
	}

	// create swap dir
	fs.mkdirSync( syncDir );

	// download files using theme kit nodejs api. Use sync dir
	// as the temp.
	await themeKit.command( 'download', {
		dir: syncDir,
		password: Auth.password,
		store: Auth.domain,
		themeid: sourceTheme.id,
		files: assetKeys,
		config: './.sync/config.yml',
		env: sanitizeThemeName( sourceTheme.name ),
	} );

	// upload files to target theme from sync dir.
	await themeKit.command( 'deploy', {
		password: Auth.password,
		store: Auth.domain,
		themeid: targetTheme.id,
		dir: syncDir,
		nodelete: true,		
		config: './.sync/config.yml',
		env: sanitizeThemeName( targetTheme.name ),
	} );

	// clean up. Remove swap folder.
	rmdir( syncDir );

	return true;
}


/**
 * Promps the user to confirm if they want to delete
 * the existing swap folder or not.
 * 
 * @return {Boolean}
 */
function promptDeletePrevSync() {
	return [ '', 'y' ].includes( prompt( 
		`A folder .sync already exists. This could mean another sync is in progress, `
		+ `or a previous sync was interrumpet. \n`
		+ `Delete .sync folder? ` 
	).toLowerCase() );
}
