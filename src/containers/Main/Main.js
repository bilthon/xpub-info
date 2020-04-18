import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { versionsArray } from '../../util/bip32';
import bs58 from 'bs58';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0.5em',
		height: '95vh'
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
			version: null,
			depth: null,
			parentFingerprint: null,
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
				xpub:{version: null, depth: null, parentFingerprint: null, index: null, chainCode: null, key: null},
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
					version: version,
					depth: depth,
					parentFingerprint: fingerprint,
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
		const { result } = this.state;
		const {
			version, 
			depth, 
			parentFingerprint, 
			index, 
			chainCode, 
			key 
		} = this.state.xpub;
		const table = version !== null ? (
			<table>
				<tbody>
					<tr>
						<td>version: {version}</td>
						<td>depth: {depth}</td>
					</tr>
					<tr>
						<td>parent: {parentFingerprint.toString('hex')}</td>
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
			</div>
		)
	}
}

export default withStyles(styles)(Main);