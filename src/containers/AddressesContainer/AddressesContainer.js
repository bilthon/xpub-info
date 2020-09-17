import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import AddressList from '../AddressList/AddressList';


class AddressesContainer extends Component {
	state = {
		selected: 0
	}

	handleChange = (event, value) => {
		this.setState({selected: value})
	}

	render() {
		const { selected } = this.state;
		const { xpub, addressFormat } = this.props;
		const types = ['internal', 'external'];
		return (
			<Container>
				<AppBar position='static' color='default'>
					<Tabs value={selected} onChange={this.handleChange} centered>
						{types.map((type, index) => (
							<Tab key={index} label={type}/>
						))}
					</Tabs>
				</AppBar>
				<AddressList
					xpub={xpub}
					internal={true}
					path={''}
					addrFormat={addressFormat}
					hidden={selected !== 0}>Internal</AddressList>
				<AddressList
					xpub={xpub}
					internal={false}
					path={''}
					addrFormat={addressFormat}
					hidden={selected !== 1}>External</AddressList>
			</Container>
		)
	}
}

AddressesContainer.propTypes = {
	xpub: PropTypes.string.isRequired
}

export default AddressesContainer;