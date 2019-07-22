import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    View 
} from 'react-native';
import TabButtonStyle from './TabButtonStyle';


const TabButton = (props) => {
    const { tabTitle, tabIcon, action } = props;
    const { titleTabButtonStyle, iconTabButtonStyle, tabButtonStyle } = TabButtonStyle;
    return (
        <TouchableOpacity style={tabButtonStyle} onPress={action}>
            <View>
                <Image
                    style={iconTabButtonStyle}
                    source={{ uri: tabIcon }}
                />
                <Text style={titleTabButtonStyle}>
                    {tabTitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default TabButton;
