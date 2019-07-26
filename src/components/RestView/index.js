import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

export default function RestView(props) {
    const {restType, restContent} = props;
    return (
        <View>
            <Text style={styles.headerText}>{restType}</Text>
            <Text style={styles.contentText}>{restContent}</Text>
        </View>
    );
}
