import React, { Component } from 'react';
import { View } from 'react-native';
import TabButton from './button/TabButton';
import TabNavigatorStyle from './TabNavigatroStyle';

class TabNavigator extends Component {
    renderButtons() {
        return this.props.data.map(item =>
            (<TabButton
                key={item.title}
                tabTitle={item.title}
                tabIcon={item.icon}
                action={item.action}
            />));
    }

    render() {
        return (
            <View style={TabNavigatorStyle.tabNavigatorStyle}>
                {this.renderButtons()}
            </View>
        );
    }
}

export default TabNavigator;
