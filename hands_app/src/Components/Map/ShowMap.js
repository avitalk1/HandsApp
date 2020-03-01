import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

const defaultLocation = {
    initialCenter: {
        lat: 32.109333,
        lng: 34.855499
    },
    centerAroundCurrentLocation: false,
}

const MapContainer = (props) => {
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [posts, setPosts] = useState([]);
    const [coordinates, setCordinates] = useState([]);
    const [finished, setFinished] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(defaultLocation.initialCenter);
    const [centerAroundCurrentLocation, setCenterAroundCurrentLocation] = useState(defaultLocation.centerAroundCurrentLocation);
    const fetchData = async () => {
        try {
            const results = await axios.get(`https://hands-app.herokuapp.com/post/showAllPosts`);
            results.data.map((res, index) => {
                setPosts(posts => [...posts, res.request]);
                if (index === results.data.length - 1) setFinished(finished + 1);
            })
        } catch (err) {
            console.log(err);
        }
    }
    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props)
        setActiveMarker(marker);
        setShowingInfoWindow(true)
    }

    const onClose = () => {
        setShowingInfoWindow(false);
        setActiveMarker(null);
    };

    const handleGeoCode = async () => {
        posts.map(async (value, index) => {
            try {
                const res = await geocodeByAddress(value.location);
                const latLng = await getLatLng(res[0]);
                setCordinates(coordinates => [...coordinates, latLng]);
                if (index === posts.length - 1) setFinished(finished + 1)
            } catch (err) {
                console.log(err)
            }
        })
    }
    useEffect(() => {
        fetchData()
    }, []);
    useEffect(() => {
        if (finished === 1)
            handleGeoCode()
        if (finished === 2 && coordinates.length === posts.length) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    setCurrentLocation({
                        lat: coords.latitude,
                        lng: coords.longitude
                    })
                    setCordinates(coordinates => [...coordinates, {
                        lat: coords.latitude,
                        lng: coords.longitude, isCurrent: true
                    }])
                });

            }

            setCenterAroundCurrentLocation(true)
        }
    }, [finished]);


    if (centerAroundCurrentLocation && currentLocation !== defaultLocation.initialCenter) {
        return (
            <Map google={props.google} zoom={14} initialCenter={currentLocation}>
                {coordinates.map((cor, index) => {
                    if (cor.isCurrent) {
                        return (
                            <Marker
                            onClick={onMarkerClick}
                                key={index}
                                name={'current location'}
                                position={{ lat: cor.lat, lng: cor.lng }} 
                                style={{color:"blue"}}
                                />
                                
                        )
                    } else {
                        return (
                            <Marker
                                onClick={onMarkerClick}
                                key={index}
                                name={posts[index].subject}
                                position={{ lat: cor.lat, lng: cor.lng }} />
                        )
                    }
                })}
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    onClose={onClose}
                >
                    <div>
                        <h4>{selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>

        );
    } else return null


}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAPoh5Rwv2aa82C-zXcocmZcPx_-BOSN20'

})(MapContainer)