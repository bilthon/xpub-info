import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		padding: '20px'
	}
});

const xpubDetails = props => {
	const { classes } = props;
	return (
		<Paper>
			<table className={classes.root}>
				<tbody>
					<tr>
						<td>
							<Typography variant='caption'><bold>version</bold></Typography>
							<Typography variant='body1'>{props.version}</Typography>
						</td>
						<td>
							<Typography variant='caption'>depth</Typography>
							<Typography variant='body1'>{props.depth ? props.depth : ''}</Typography>
						</td>
					</tr>
					<tr>
						<td>
							<Typography variant='caption'>
								parent
							</Typography>
							<Typography variant='body1'>
								{props.parent.toString('hex')}
							</Typography>
						</td>
						<td>
							<Typography variant='caption'>index</Typography>
							<Typography variant='body1'>{props.index.toString('hex')}</Typography>
						</td>
					</tr>
					<tr>
						<td>
							<Typography variant='caption' align='center'>chaincode</Typography>
							<Typography variant='body1'>{props.chainCode.toString('hex')}</Typography>
						</td>
					</tr>
					<tr>
						<Typography variant='caption'>key</Typography>
						<Typography variant='body1'>{props._key.toString('hex')}</Typography>
					</tr>
				</tbody>
			</table>
		</Paper>
	)
}

xpubDetails.propTypes = {
	version: PropTypes.string.isRequired,
	depth: PropTypes.object.isRequired,
	parent: PropTypes.object.isRequired,
	index: PropTypes.object.isRequired,
	chainCode: PropTypes.object.isRequired,
	_key: PropTypes.object.isRequired
}

export default withStyles(styles)(xpubDetails);