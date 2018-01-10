import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {

  constructor (props) {
    super (props)
    this.state = {latitude: props.latitude, longitude: props.longitude}
  }

  render () {
    return (
      <Map
        google={this.props.google}
        style={{width: '100%', height: 250, position: ''}}
        className={'map'}
        zoom={15}
        containerStyle={{position: ''}}
        initialCenter={{
          lat: this.state.latitude,
          lng: this.state.longitude
        }}
        // centerAroundCurrentLocation={true}
        >
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: this.state.latitude, lng: this.state.longitude}}/>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBMuZE_KeytDyFqDkvhGpTaDmR2pttz07Q'
})(MapContainer)