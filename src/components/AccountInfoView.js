import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const AccountInfo = props => {
    const accountObject = props.accountObject;
    const navigation = useNavigation();

    const calculateBalance = accountObject => {
        return accountObject.history.reduce( (acc, item) => {
            return acc + item.value;
        }, accountObject.balance) / 100;
    }

    const calculateMovementTotal = accountObject => {
        return accountObject.history.reduce( (acc, item) => {
            return acc + item.value;
        }, 0) / 100;
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Overview', accountObject)}>
            <View style={{margin: 5, backgroundColor: "#BBB", borderRadius: 10, padding: 5}}>
                <Text>Account id: {accountObject.id}</Text>
                <Text>Account Initial Balance: {accountObject.balance}</Text>
                <Text>Account Balance: {calculateBalance(accountObject)}</Text>
                <Text>Account Movement Total: {calculateMovementTotal(accountObject)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AccountInfo;