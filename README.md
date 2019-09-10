# Shopify Utils by ON Lab

A bunch of utilities to use when working with Shopify.

# ⓵ Installation

## Using YARN
Run `yarn add shopify-cli`.

## Install using NPM
Run `npm install shopify-cli`.

Or run `npm install -g shopify-cli` to install globally.

## Install from source code
Clone this repo using `git clone https://github.com/nicolasalliaume/on-shopify-utils`.

# ② Usage

```
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
#### Remove themes
#### Activate theme
#### Rename theme
#### Duplicate theme
#### Sync themes
#### Bootstrap themes

## Theme Kit integration
#### Create config


--------

[![ON Lab](http://on-lab.com/on-lab.jpg)](http://on-lab.com)