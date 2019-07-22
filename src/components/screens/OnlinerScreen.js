import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class OnlinerScreen extends Component {
    render() {
        return (
            <WebView
                source={{ uri: 'https://www.onliner.by/' }}
            />
        );
    }
}

export default OnlinerScreen;
