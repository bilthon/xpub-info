import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AddressesContainer extends Component {
	state = {
		selected: 0
	}

	handleChange = (event, value) => {
		this.setState({selected: value})
	}

	render() {
		const { selected } = this.state;
		return (
			<Container maxWidth='xl'>
				<AppBar position='static' color='default'>
					<Tabs value={selected} onChange={this.handleChange}>
						<Tab label='BIP-44'/>
						<Tab label='BIP-49'/>
						<Tab label='BIP-84'/>
					</Tabs>
				</AppBar>
				<div hidden={selected !== 0}>BIP-44 content</div>
				<div hidden={selected !== 1}>BIP-49 content</div>
				<div hidden={selected !== 2}>BIP-84 content</div>
			</Container>
		)
	}
}

export default AddressesContainer;