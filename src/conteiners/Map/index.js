import React, {Component} from 'react';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import MapView from 'react-native-maps';
import styles from './styles';
import {getPosition} from "../../action/position";
import {connect} from "react-redux";
import {LATITUDE_DELTA, LONGITUDE_DELTA} from "../../constants/mapConstants";

class Map extends Component {
    componentDidMount(): void {
        if (!this.props.positionLoaded) {
            this.props.getPosition();
        }
    }

    render() {
        return (
            <MapView
                style={styles.mapStyle}
                region={this.provideRegion()}>
                <MapMarker coordinate={this.provideCoords()}/>
            </MapView>
        );
    }

    provideCoords(){
        return ({
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude
        });
    }

    provideRegion() {
        return ({
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
    }
}

const mapDispatchToProps = dispatch => ({
    getPosition: () => dispatch(getPosition())
});

const mapStateToProps = state => ({
    positionLoaded: state.position.positionLoaded,
    coords: state.position.coords
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
