import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
 // const [coordinates,setCoordinates]=useState({lat:null,lng:null})
 coordinates=this.setState({lat:null,lng:null})

//   handleGeoCode= async value=>{  // we need to get the adress from the data as a value.
//     const res= await geocodeByAddress(value);
//     const latLng= await getLatLng(res);
//     this.coordinates(latLng);
//   };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVxmMaHyU8KrBSuUrrt7TNIQ3FszJijOc'
})(MapContainer);