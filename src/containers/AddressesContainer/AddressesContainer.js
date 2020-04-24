import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import AddressList from '../AddressList/AddressList';
import { SUPPORTED_VERSIONS } from '../../util/bip32';

class AddressesContainer extends Component {
	state = {
		selected: 0
	}

	handleChange = (event, value) => {
		this.setState({selected: value})
	}

	render() {
		const { selected } = this.state;
		const versions = Object.keys(SUPPORTED_VERSIONS).map(key => {
			return {
				title: SUPPORTED_VERSIONS[key].title,
				addrFormat: SUPPORTED_VERSIONS[key].address 
			}
		});
		const { xpub } = this.props;
		return (
			<Container>
				<AppBar position='static' color='default'>
					<Tabs value={selected} onChange={this.handleChange} centered>
						{versions.map((version, index) => (
							<Tab key={index} label={version.title}/>
						))}
					</Tabs>
				</AppBar>
				{versions.map(( version, index ) => {
					return (
						<AddressList 
							key={index} 
							xpub={xpub}
							addrFormat={version.addrFormat}
							hidden={selected !== index}>{version}</AddressList>
					);
				})}
			</Container>
		)
	}
}

AddressesContainer.propTypes = {
	xpub: PropTypes.string.isRequired
}

export default AddressesContainer;