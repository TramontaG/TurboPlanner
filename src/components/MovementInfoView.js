import React from 'react';
import {View, Text, Button} from 'react-native';

const MovementInfoView = props => {

    const movement = props.movement;

    return (
        <View style={{margin: 5, padding: 5, borderRadius: 10, backgroundColor: '#DDD', elevation: 10}}>
            <Text>Id: {movement.id}</Text>
            <Text>Category: {movement.category || "null"}</Text>
            <Text>Date: {movement.date.toLocaleString("pt-BR")}</Text>
            <Text>Type: {movement.type}</Text>
            <Text>Value: {Number.parseInt(movement.value) / 100}</Text>
            <Button title="TODO: delete movement" />
        </View>
    );
}

export default MovementInfoView;