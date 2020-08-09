import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';

import { payments } from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import * as addressFormats from '../../util/addressFormats';

const WALLET_GAP = 20;

class AddressList extends Component {
	state = {
		rows: []
	}

	componentDidMount(){
		const keys = [];
		const node = bip32.fromBase58(this.props.xpub);
		for (let index = 0; index < WALLET_GAP; index++) {
			let external = node.derive(0).derive(index);
			// let change = node.derive(1).derive(index);
			keys.push({key: external.publicKey, type: 'external'});
			// keys.push({key: change.publicKey, type: 'change'});
		}
		this.setState({rows: keys});
	}

	render() {
		const { rows } = this.state;
		const { addrFormat, path } = this.props;
		let listItemContents = rows.map(row => {
			switch (addrFormat) {
				case addressFormats.P2PKH:
					return {address: payments.p2pkh({pubkey: row.key}).address}
				case addressFormats.P2SH:
					return {address: payments.p2sh({redeem: payments.p2wpkh({pubkey: row.key})}).address}
				case addressFormats.P2WPKH:
					return {address: payments.p2wpkh({pubkey: row.key}).address}
				default:
					return {address: 'unknown'}
			}
		});
		return (
			<div hidden={this.props.hidden}>
				<List>
					{listItemContents.map((content, index) => {
						return (
							<ListItem key={index} alignItems='flex-start' divider>
								<ListItemText
									primary={path + '/0/' + index}
								/>
								<ListItemText 
									primary={content.address}/>
							</ListItem>
						)
					})
					}
				</List>
			</div>
		)
	}
}

AddressList.propTypes = {
	xpub: PropTypes.string.isRequired,
	addrFormat: PropTypes.string.isRequired,
	hidden: PropTypes.bool.isRequired
}

export default AddressList;