import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex',
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
	addresses: {
		width: '80%'
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
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.xpub}>
					<FormControl fullWidth>
						<TextField variant='outlined' label='Extended Key'/>
					</FormControl>
				</div>
				<div>

				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Main);