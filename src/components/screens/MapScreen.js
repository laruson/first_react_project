import React from 'react';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import MapView from 'react-native-maps';
import MapScreenStyles from './MapScreenStyles';
import GeoUtils from '../../utils/GeoUtils';

class MapScreen extends GeoUtils {
    render() {
        return (
            <MapView
                style={MapScreenStyles.mapStyle}
                region={this.provideRegion()}
            >
                <MapMarker coordinate={this.provideCoords()} />
            </MapView>
        );
    }
}

export default MapScreen;
