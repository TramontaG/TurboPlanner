import React from 'react';
import {View, Text, Button} from 'react-native';

const IncButton = (props) => {
    return (
        <View>
            <Text>Current Value = {props.data.value}</Text>
            <Button title="increment" onPress={() => props.data.value++} />
        </View>
    )
}

export default IncButton;