import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { versionsArray } from '../../util/bip32';
import bs58 from 'bs58';
import AddressesContainer from '../AddressesContainer/AddressesContainer';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0.5em'
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
	}
});

class Main extends React.Component {
	state = {
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

	render() {
		const { classes } = this.props;
		const { result, xpub } = this.state;
		const {
			version, 
			depth, 
			parent, 
			index, 
			chainCode, 
			key 
		} = xpub;
		const table = version !== null ? (
			<table>
				<tbody>
					<tr>
						<td>version: {version}</td>
						<td>depth: {depth}</td>
					</tr>
					<tr>
						<td>parent: {parent.toString('hex')}</td>
						<td>index: {index.toString('hex')}</td>
					</tr>
					<tr>
						<td>chaincode: {chainCode.toString('hex')}</td>
					</tr>
					<tr>
						<td>key: {key.toString('hex')}</td>
					</tr>
				</tbody>
			</table>
		) : null;
		return (
			<div className={classes.root}>
				<div className={classes.xpub}>
					<FormControl fullWidth error={result.error !== null}>
						<TextField
							onChange={this.onXpubChange} 
							variant='outlined' 
							label='Extended Key'/>
						<FormHelperText variant='outlined'>{result.error ? result.error : ''}</FormHelperText>
					</FormControl>
				</div>
				<div className={classes.summary}>
					{table}
				</div>
				{(xpub.raw) ? (
					<div>
						<AddressesContainer xpub={xpub.raw}/>
					</div>
				) : null}
			</div>
		)
	}
}

export default withStyles(styles)(Main);