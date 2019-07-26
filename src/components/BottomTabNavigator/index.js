import React from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import GeoView from '../../conteiners/Geo';
import OnlinerView from '../../conteiners/Onliner';
import RestView from '../../conteiners/Rest';
import MapView from '../../conteiners/Map';
import styles from './styles';
import * as tabNames from '../../constants/tabNames'
import TabIcon from '../TabIconView/index';

const BottomNavigator = createBottomTabNavigator({
        Geo: GeoView,
        Onliner: OnlinerView,
        Rest: RestView,
        Map: MapView
    }, {
        tabBarOptions: {
            labelStyle: styles.tabBarText,
        },
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: () => {
                const {routeName} = navigation.state;
                switch (routeName) {
                    case tabNames.GEO:
                        return (
                            <TabIcon source={require('../../public/image/icon_geo.jpg')}/>
                        );
                    case tabNames.ONLINER:
                        return (
                            <TabIcon source={require('../../public/image/icon_onliner.png')}/>
                        );
                    case tabNames.REST:
                        return (
                            <TabIcon source={require('../../public/image/icon_rest.png')}/>
                        );
                    case tabNames.MAP:
                        return (
                            <TabIcon source={require('../../public/image/icon_map.png')}/>
                        );
                }
            }
        })
    }
);

export default createAppContainer(BottomNavigator);
