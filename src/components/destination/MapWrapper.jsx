import React, { Component } from 'react';
import Map from './Map';

class MapWrapper extends Component {

	render() {
		return(
			<div style={{ margin: '20px' }}>
				<Map
					google={this.props.google}
					center={{lat: 18.5204, lng: 73.8567}}
					height='550px'
					zoom={15}
				/>
			</div>
		);
	}
}

export default MapWrapper;
