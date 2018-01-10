import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Paho from './libs/mqttws31'
import MapTest from './MapTest'

let devices = []

const init = {
  hostname: 'odin.cmmc.io',
  port: 9001,
  path: '',
  clientId: String(Math.random() * 100)
}

const options = {
  //useSSL: true,
  userName: 'cmmc',
  password: 'cmmc',
  onSuccess: onConnect
}

const client = new Paho.MQTT.Client(init.hostname, init.port, init.path, init.clientId)

client.onConnectionLost = onConnectionLost
client.onMessageArrived = onMessageArrived
//client.connect({onSuccess: onConnect})
client.connect(options)

function onConnect () {
  //console.log('onConnect')
  client.subscribe('retain/WORK/TRAFFY_V3/TEST/#')
}

function onConnectionLost (responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage)
  }
}

function onMessageArrived (message) {

  let d = JSON.parse(message.payloadString)

  devices.push({
    lat: d.gps_latitude,
    lng: d.gps_longitude
  })

}

export default class MapMarker extends Component {

  constructor (props) {
    super(props)

    this.state = {devices: []}
  }

  componentDidMount () {

    setInterval(() => {
      if (this.state.devices !== devices) {
        console.log('different')
        console.log('before === ', this.state.devices)
        this.setState({devices: devices})
        console.log('after === ', this.state.devices)
       // ReactDOM.render(, document.getElementById('GoogleMap'))
      }
    }, 2000)

  }

  render () {
    return (<MapTest child={this.state.devices}/>)
  }
}