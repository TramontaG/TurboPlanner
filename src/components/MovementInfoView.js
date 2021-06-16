import React from 'react';
import {View, Text, Button} from 'react-native';

import {centsToReal} from './../util/Conversor';

const MovementInfoView = (props) => {
    const movement = props.movement;

    return (
        <View
            style={{
                margin: 5,
                padding: 5,
                borderRadius: 10,
                backgroundColor: '#DDE5DD',
                elevation: 10,
            }}>
            <Text>Categoria: {movement.category.name || 'null'}</Text>
            <Text>Date: {movement.date.toLocaleString('pt-BR')}</Text>
            <Text>Tipo: {movement.type}</Text>
            <Text>Valor: R${centsToReal(movement.value)}</Text>
            <View
                style={{
                    backgroundColor: movement.category.color,
                    padding: 2,
                    borderRadius: 5,
                    marginVertical: 5,
                }}></View>

            <Button
                title="Remover movimentação"
                onPress={() => props.deleteRoutine(movement.id)}
            />
        </View>
    );
};

export default MovementInfoView;
