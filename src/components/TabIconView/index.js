import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

export default function TabIcon(props) {
    return (
        <Image
            style={styles.tabIcon}
            source={props.source}
        />
    );
}
