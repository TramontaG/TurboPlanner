import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {centsToReal} from './../util/Conversor';

const BalanceHomeView = (props) => {
    const [balance, setBalance] = useState(props.balance);

    const addBgColor = (style) => ({
        ...style,
        backgroundColor: balance < 0 ? '#A55' : '#5A5',
    });

    return (
        <View style={addBgColor(Style.container)}>
            <Text style={Style.textStyle}>Balanço total</Text>
            <Text style={Style.textStyle}>R$ {centsToReal(props.balance)}</Text>
        </View>
    );
};

const Style = StyleSheet.create({
    container: {
        padding: '3%',
        height: '25%',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        elevation: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold',
    },
});

export default BalanceHomeView;
