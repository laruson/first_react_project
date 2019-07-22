import React from 'react';
import { AppRegistry } from 'react-native';
import MainActivity from './src/components/MainActivity';

const Application = () => (
    <MainActivity />
);

AppRegistry.registerComponent('education_react', () => Application);
