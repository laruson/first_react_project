import { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

class GeoUtils extends Component {
    constructor() {
        super();
        this.state = { position: {}, marker: {} };
    }

    componentDidMount(): void {
        this.requestPermission();
    }

    async requestPermission() {
        try {
            const granted = await PermissionsAndroid
                .request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.provideGeo();
            }
        } catch (err) {
            console.warn(err);
        }
    }

    provideGeo() {
        Geolocation.getCurrentPosition(
            (responce) => {
                this.setState({
                    position: responce.coords,
                    marker: {
                        latitude: responce.coords.latitude,
                        longitude: responce.coords.longitude
                    }
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    provideCoords() {
        if (this.state.position != null &&
            this.state.position.longitude != null) {
            return {
                latitude: this.state.position.latitude,
                longitude: this.state.position.longitude
            };
        }
        return {
            latitude: 0,
            longitude: 0
        };
    }

    provideRegion() {
        if (this.state.position != null &&
            this.state.position.longitude != null) {
            return {
                latitude: this.state.position.latitude,
                longitude: this.state.position.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            };
        }
        return {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        };
    }
}

export default GeoUtils;
