import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {ONLINER_ADDRESS} from '../../constants/webAddres'

class Onliner extends Component {
    render() {
        return (
            <WebView source={{ uri: ONLINER_ADDRESS }}/>
        );
    }
}

export default Onliner;
