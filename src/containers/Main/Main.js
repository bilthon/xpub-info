import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import { withStyles } from '@material-ui/core/styles';
import { versionsArray } from '../../util/bip32';
import { P2PKH } from '../../util/addressFormats';
import bs58 from 'bs58';
import AddressesContainer from '../AddressesContainer/AddressesContainer';
import XpubDetails from '../../components/XpubDetails';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0.5em'
	},
	header: {
		width: '80%'
	},
	footer: {
		width: '80%'
	},
	title: {
		textAlign: 'center',
		marginBottom: '1em'
	},
	radioSectionContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '1em'
	},
	radioButtonContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-evenly'
	},
	xpub: {
		width: '80%',
		height: '150pt',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	summary: {
		width: '80%',
		height: '200pt'
	},
	addresses: {
		width: '80%'
	}
});

class Main extends React.Component {
	state = {
		addressFormat: P2PKH,
		xpub: {
			raw: null,
			version: null,
			depth: null,
			parent: null,
			index: null,
			chainCode: null,
			key: null
		},
		result: {
			error: null
		}
	}

	onXpubChange = event => {
		const { value } = event.target;
		const version = value.slice(0, 4);
		if ( versionsArray().indexOf(version) === -1) {
			this.setState({
				xpub:{
					raw: null,
					version: null, 
					depth: null, 
					parent: null, 
					index: null, 
					chainCode: null, 
					key: null},
				result: {error: 'Invalid xpub'}
			})
		} else {
			const decoded = bs58.decode(value);
			const depth = decoded.slice(4, 5);
			const fingerprint = decoded.slice(5, 9);
			const childNumber = decoded.slice(9, 13);
			const chainCode = decoded.slice(13, 45);
			const key = decoded.slice(45, 78);
			this.setState({
					xpub: {
						raw: value,
						version: version,
						depth: depth,
						parent: fingerprint,
						index: childNumber,
						chainCode: chainCode,
						key: key
					},
					result: {error: null}
				});
		}
	}

	handleAddressFormatChange = event => {
		this.setState({addressFormat: event.target.value});
	}

	render() {
		const { classes } = this.props;
		const { addressFormat, result, xpub } = this.state;
		const {
			version, 
			depth, 
			parent, 
			index, 
			chainCode, 
			key 
		} = xpub;
		const table = (version && depth && parent && index && chainCode && key) ? (
			<XpubDetails
				version={version}
				depth={depth}
				parent={parent}
				index={index}
				chainCode={chainCode}
				_key={key}
				/>
			) : null;
		let addressType = null;
		if (version && depth && parent && index && chainCode && key) {
			addressType = (
				<div className={classes.radioSectionContainer}>
					<FormLabel>Address Type</FormLabel>
					<RadioGroup className={classes.radioButtonContainer} row aria-label="address format" name="address format" value={this.state.addressFormat} onChange={this.handleAddressFormatChange}>
						<FormControlLabel value="P2PKH" control={<Radio />} label="P2PKH" />
						<FormControlLabel value="P2SH" control={<Radio />} label="P2SH" />
						<FormControlLabel value="P2WPKH" control={<Radio />} label="P2WPKH" />
					</RadioGroup>
				</div>
			)
		}
		return (
			<div className={classes.root}>
				<section className={classes.header}>
					<Typography className={classes.title} variant='h4'>Xpub Info</Typography>
					<Typography variant='body1'>
						An xpub (short for eXtended PUBlic key) is a special kind of key that comes attached with some extra meta-data that allows it to extend it to generate new keys.
					</Typography>
					<Typography variant='body1'>
						You can use this tool to check the different bitcoin addresses that any xpub can generate.
					</Typography>
				</section>
				<div className={classes.xpub}>
					<FormControl fullWidth error={result.error !== null}>
						<TextField
							onChange={this.onXpubChange} 
							variant='outlined' 
							label='Extended Key'/>
						<FormHelperText variant='outlined'>{result.error ? result.error : ''}</FormHelperText>
						{ addressType }
					</FormControl>
				</div>
				<div className={classes.summary}>
					{table}
				</div>
				{(xpub.raw) ? (
					<div className={classes.addresses}>
						<AddressesContainer
							addressFormat={addressFormat} 
							xpub={xpub.raw}/>
					</div>
				) : null}

				<section className={classes.footer}>
					<Typography variant='subtitle1'>
						Is this safe?
					</Typography>
					<Typography variant='caption' paragraph>
						An extended public key can only generate "public" keys, meaning
						that the keys generated in the browser will not be able to be
						used to spend your funds. There are serious privacy concerns
						in revealing your xpub to third parties, as these will be
						able not only to discover all your past transaction history,
						but track you in the future as well.
					</Typography>
					<Typography variant='caption' paragraph>
						This website is not collecting xpubs and is intended as an educational tool. 
						But you don't have to trust this, you can verify it by checking the source code <Link href='https://github.com/bilthon/xpub-info'>here</Link>.
						And of course, you can always run it off-line ;).
					</Typography>
					<Link href='https://github.com/bilthon/xpub-info' target='_blank' rel='noreferrer'>
						<GitHubIcon style={{width: '100%'}}/>
					</Link>
				</section>
			</div>
		)
	}
}

export default withStyles(styles)(Main);