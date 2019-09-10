const colors = require( 'colors' );

module.exports = () => `
Auth information not provided.
Run the command again using ${ '-d <domain> -k <key> -p <password>'.bold.italic } 

or run ${ '$ shopify-cli config -d <domain> -k <key> -p <password>'.italic.bold } \
to save the authentication information. \
This way you won't have to use the auth params every time.

To get more details on how to get the auth information, run:
	$ shopify-cli config
`;