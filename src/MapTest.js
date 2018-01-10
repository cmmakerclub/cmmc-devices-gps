import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import uuid from 'uuid'

export class MapContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {child: props.child}
  }

  componentDidMount () {
    console.log('Map Test : ', this.state.child)
  }

  componentWillReceiveProps(props) {
    // console.log('recv props', props)
    this.setState({child: props.child})
  }

  componentWillUpdate() {
    console.log('will update')
  }

  render () {

    // const MarkerComponent = (props) => {
    //
    //   console.log('MarkerComponent props', props.gps)
    //
    //   return
    // }

    return (
      <Map
        google={this.props.google}
        style={{width: '100%', height: 768, position: ''}}
        className={'map'}
        zoom={11}
        containerStyle={{position: ''}}
        initialCenter={{
          lat: 7.924533332999999,
          lng: 98.37156
        }}
      >
        {
          this.state.child.map(gps => {
            console.log('Before MarkerComponent called ', gps)
            return <Marker  key={uuid()} position={{lat: gps.lat, lng: gps.lng}}/>

          })
        }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBMuZE_KeytDyFqDkvhGpTaDmR2pttz07Q'
})(MapContainer)