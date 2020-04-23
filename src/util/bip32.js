import * as addressFormats from './addressFormats';

export const SUPPORTED_VERSIONS = {
	xpub: {
		title: 'BIP-44',
		path: 'm\/44\'/0\'',
		type: 'public',
		address: addressFormats.P2PKH
	},
	ypub: {
		title: 'BIP-49',
		path: 'm/49\'/0\'',
		type: 'public',
		address: addressFormats.P2SH
	},
	zpub: {
		title: 'BIP-84',
		path: 'm/84\'/0\'',
		type: 'public',
		address: addressFormats.P2WPKH
	}
}

export const versionsArray = () => {
	return Object.keys(SUPPORTED_VERSIONS);
}