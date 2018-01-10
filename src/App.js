import React, { Component } from 'react'
import * as firebase from 'firebase'
import uuid from 'uuid'
import _ from 'underscore'
import moment from 'moment-timezone'
import Map from './Map.js'

moment.locale('th')

const FirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDjKtk-mfuS_g3ZnWI4NX2x5ynUQU1Y3og',
  authDomain: 'performance-182414.firebaseapp.com',
  databaseURL: 'https://performance-182414.firebaseio.com',
  projectId: 'performance-182414',
  storageBucket: 'performance-182414.appspot.com',
  messagingSenderId: '779931616641'
})

const Database = FirebaseApp.database()

export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {devices: []}
  }

  componentDidMount () {
    Database.ref('/devices').on('value', snapshot => {
      Object.keys(snapshot.val()).forEach(key => {

        Database.ref(`/devices/${key}`).on('value', child => {

          let data = this.state.devices

          data.push({
            key: child.key,
            data: child.val()
          })

          data = _.sortBy(data, d => d.data.updated_at).reverse()
          data = _.uniq(data, device => device.key)

          this.setState({devices: data})
        })

      })
    })
  }

  updateData = (event, d) => {
    event.preventDefault()
    Database.ref(`/devices/${d.uuid}`).update({
      'latitude': d.latitude,
      'longitude': d.longitude,
      'updated_at': moment.now()
    })
    console.log('updated')
  }

  render () {

    const DeviceInformation = (props) => {

      let d = {
        uuid: props.deviceKey,
        latitude: props.data.latitude,
        longitude: props.data.longitude,
        updated_at: props.data.updated_at
      }

      let handleLatitude = (event) => {
        event.preventDefault()
        d.latitude = event.target.value
      }

      let handleLongitude = (event) => {
        event.preventDefault()
        d.longitude = event.target.value
      }

      return (
        <div className="col-4">
          <div className="form-group">
            <div className="card">
              <div className="card-body">
                <h3>UUID : {d.uuid}</h3>
                <div className="form-group">
                  <label>latitude</label>
                  <input type="text" className='form-control' defaultValue={d.latitude}
                         onChange={e => handleLatitude(e)}/>
                </div>
                <div className="form-group">
                  <label>longitude</label>
                  <input type="text" className='form-control' defaultValue={d.longitude}
                         onChange={e => handleLongitude(e)}/>
                </div>
                <div className="form-group">
                  <span className='text-danger'>
                    <i className='fa fa-clock-o'/>&nbsp;
                    Last updated : {moment(d.updated_at).fromNow()}
                    </span>
                </div>
                <div className="form-group">
                  <Map latitude={d.latitude} longitude={d.longitude}/>
                </div>
                <div className="form-group">
                  <button type='button' className='btn btn-success float-right'
                          onClick={e => this.updateData(e, d)}>Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='container' style={{marginTop: 30}}>
        <div className='row'>
          {
            this.state.devices.map(device => <DeviceInformation key={uuid()} deviceKey={device.key}
                                                                data={device.data}/>)
          }
        </div>
      </div>
    )
  }

}
