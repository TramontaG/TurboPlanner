import React from 'react';
import {StyleSheet, View} from 'react-native';

const GenericContainer = (props) => {
    if (props.visible) {
        return <View style={Style.container}>{props.children}</View>;
    } else {
        return null;
    }
};

const Style = StyleSheet.create({
    container: {
        padding: 10,
        borderColor: '#rgba(20,50,20,.2)',
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
    },
});

export default GenericContainer;
