import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header = (props) => {
    return (
        <View style={Style.titleContainer}>
            <Text style={Style.title}>{props.text}</Text>
        </View>
    );
};

const Style = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#5A5',
        paddingVertical: 7,
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default Header;
