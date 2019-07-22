import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import axios from 'axios';


class RestScreen extends Component {
    constructor() {
        super();
        this.state = { response: {} };
    }

    componentDidMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(responceData => this.setState({ responce: responceData }));
    }

    render() {
        return (
            <ScrollView>
                <Text>{ JSON.stringify(this.state.responce) }</Text>
            </ScrollView>
        );
    }
}

export default RestScreen;
