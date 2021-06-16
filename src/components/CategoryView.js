import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import GenericContainer from './GenericContainer';

const CategoryView = (props) => {
    const {categoryObj, deleteFn} = props;

    return (
        <View
            style={{
                ...Style.container,
                backfaceVisibility: 'visible',
            }}>
            <View style={{width: '80%', justifyContent: 'space-between'}}>
                <Text>{categoryObj.name}</Text>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: categoryObj.color,
                        padding: 2,
                        borderRadius: 5,
                    }}></View>
            </View>
            <View>
                <TouchableOpacity
                    style={Style.deleteButton}
                    onPress={() => deleteFn(categoryObj.id)}>
                    <Text style={{color: 'white'}}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderColor: '#rgba(20,50,20,.2)',
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 5,
    },
    deleteButton: {
        backgroundColor: 'rgba(255,50,50,.8)',
        padding: 10,
        borderRadius: 5,
    },
});

export default CategoryView;
