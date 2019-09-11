# Shopify Utils by ON Lab

[![Developed by ON Lab](http://on-lab.com/developed-by-on-lab.svg?v=3)](http://on-lab.com)

A bunch of utilities to use when working with Shopify.

# ① Installation

## Using YARN
Run `yarn add shopify-cli`.

## Install using NPM
Run `npm install shopify-cli`.

Or run `npm install -g shopify-cli` to install globally.

## Install from source code
Clone this repo using `git clone https://github.com/nicolasalliaume/on-shopify-utils`.

# ② Usage

```js
const ShopifyUtils = require( 'on-shopify-utils' )( {
	domain: "mystore.myshopify.com",

	// private app key
	apiKey: "myapikey", 

	// private app password				
	password: "mypassword"		
} );


ShopifyUtils.theme.list().then( themes => console.log( themes ) );
```


# ③ Operations supported (_so far_)
Right now, the CLI supports the following operations:

## Themes

#### List themes
```js
ShopifyUtils.theme.list().then( themes => ... );
```

#### Remove themes
```js
// using theme ids
ShopifyUtils.theme.remove( [ 123908123, 1230123987 ] );

// delete all non-live themes
ShopifyUtils.theme.remove( [], true );
```

#### Activate theme
```js
ShopifyUtils.theme.activate( 1231232123 );
```

#### Rename theme
```js
ShopifyUtils.theme.activate( 1231232123, 'New name' );
```

#### Duplicate theme
```js
ShopifyUtils.theme.duplicate( 1231232123, 'Duplicate theme name' );
```

#### Sync themes
```js
// sync( <source>, <target> )
ShopifyUtils.theme.sync( 1231232123, 9879879879 );
```

#### Bootstrap themes
```js
// bootstrap one or more Shopify themes
ShopifyUtils.theme.bootstrap( [ 'minimal', 'debut' ] );

// bootstrap all Shopify themes
ShopifyUtils.theme.bootstrap( [], true );
```
Available themes are:
* Brooklyn
* Boundless
* Debut
* Jumpstart
* Minimal
* Narrative
* Pop
* Simple
* Supply
* Venture

## Theme Kit integration

#### Create config
```js
// config( <domain>, <key>, <password>, <output directory>, [ <file name> ] )
ShopifyUtils.config( 'myshop.myshopify.com', '12312312312123908', '12398120398109381098123', './' );
```

--------

[![ON Lab](http://on-lab.com/on-lab.jpg)](http://on-lab.com)
