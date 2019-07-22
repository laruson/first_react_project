import React, { Component, Fragment } from 'react';
import TabNavigator from './tabNavigator/TabNavigator';
import MapScreen from './screens/MapScreen';
import GeoScreen from './screens/GeoScreen';
import OnlinerScreen from './screens/OnlinerScreen';
import RestScreen from './screens/RestScreen';

class MainActivity extends Component {
    constructor() {
        super();
        this.state = { render: '' };
        this.screens = [
            {
                title: 'Geo',
                icon: 'https://img.pngio.com/computer-icons-iconmaps-geo-png-download-16001600-free-geo-png-900_900.jpg',
                action: () => this.handleClick('Geo'),
            },
            {
                title: 'Onliner',
                icon: 'http://cdn.onlinewebfonts.com/svg/img_481250.png',
                action: () => this.handleClick('Onliner'),
            },
            {
                title: 'Rest',
                icon: 'http://i2.wp.com/www.testautomationguru.com/wp-content/uploads/2015/03/rest-api-2.png?resize=940%2C429',
                action: () => this.handleClick('Rest'),
            },
            {
                title: 'Map',
                icon: 'http://pluspng.com/img-png/google-maps-png-download-png-256px-256.png',
                action: () => this.handleClick('Map'),
            }
        ];
    }

    handleClick(screenName) {
        this.setState({ render: screenName });
    }

    renderSubComponent() {
        switch (this.state.render) {
            case 'Map':
                return <MapScreen />;
            case 'Onliner':
                return <OnlinerScreen />;
            case 'Rest':
                return <RestScreen />;
            default:
                return <GeoScreen />;
        }
    }

    render() {
        return (
            <Fragment>
                {this.renderSubComponent()}
                <TabNavigator data={this.screens} />
            </Fragment>
        );
    }
}

export default MainActivity;
