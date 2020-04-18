export const VERSIONS = {
	xpub: {
		path: 'm\/44\'/0\'',
		type: 'public',
		address: 'P2PKH or P2SH'
	},
	ypub: {
		path: 'm/49\'/0\'',
		type: 'public',
		address: 'P2WPKH in P2SH'
	},
	zpub: {
		path: 'm/84\'/0\'',
		type: 'public',
		address: 'P2WPKH'
	}
}

export const versionsArray = () => {
	return Object.keys(VERSIONS);
}