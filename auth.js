class Auth {
	constructor( domain, apiKey, password ) {
		this.domain = domain;
		this.apiKey = apiKey;
		this.password = password;
	}

	set( auth = {} ) {
		if ( ! this.validate( auth ) ) {
			const error = new Error( 'Invalid authentication' );
			error.statusCode = 403;
			throw error;
		}

		this.domain = auth.domain;
		this.apiKey = auth.apiKey;
		this.password = auth.password;
	}

	validate( auth ) {
		return auth.domain && auth.apiKey && auth.password;
	}
}

const auth = new Auth();
module.exports = auth;