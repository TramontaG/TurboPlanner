import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BalanceHomeView = props => {
    const [balance, setBalance] = useState(props.balance);

    const addBgColor = style => ({
        ...style,
        backgroundColor: balance < 0 ? "red" : "green",
    })

    return (
        <View style={addBgColor(Style.container)}>
            <Text>Saldo Total: {balance}</Text>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        padding: "3%",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    }
})

export default BalanceHomeView;