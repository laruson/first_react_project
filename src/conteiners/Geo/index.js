import React, {Component} from 'react';
import {PermissionsAndroid, ProgressBarAndroid, Text, View} from 'react-native';
import {getPosition} from "../../action/position";
import {connect} from 'react-redux';

class Geo extends Component {
    componentDidMount(): void {
        this.requestPermission();
    }

    async requestPermission() {
        try {
            const granted = await PermissionsAndroid
                .request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.props.getPosition();
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <View>
                {this.renderGeo()}
            </View>
        );
    }

    renderGeo() {
        if (this.props.positionLoaded) {
            return (
                <View>
                    <Text>{this.props.coords.latitude}</Text>
                    <Text>{this.props.coords.longitude}</Text>
                </View>
            );
        }
        return <ProgressBarAndroid/>
    }
}


const mapDispatchToProps = dispatch => ({
    getPosition: () => dispatch(getPosition())
});

const mapStateToProps = state => ({
    positionLoaded: state.position.positionLoaded,
    coords: state.position.coords
});

export default connect(mapStateToProps, mapDispatchToProps)(Geo);
