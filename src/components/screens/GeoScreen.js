import React from 'react';
import { Text, View } from 'react-native';
import GeoUtils from '../../utils/GeoUtils';

class GeoScreen extends GeoUtils {
    render() {
        return (
            <View>
                <Text>{this.state.position.latitude}</Text>
                <Text>{this.state.position.longitude}</Text>
            </View>
        );
    }
}

export default GeoScreen;
