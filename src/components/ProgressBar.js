import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = props => {
    const [percentage, setPercentage] = useState(props.percentage);

    const addFlex = (style, percentage) => ({
        ...style,
        flex: percentage,
    });

    return (
        <View style={Style.container}>
            <View style={addFlex(Style.completed, percentage)}></View>
            <View style={addFlex(Style.remaining, 1-percentage)}></View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#CCC',
        borderRadius: 10,
        flexDirection: 'row',
    },
    completed: {
        paddingVertical: 3,
        backgroundColor: "green",
        borderRadius: 10,
    },
    remaining: {
        paddingVertical: 3,
        backgroundColor: "#CCC",
    }
    
})

export default ProgressBar;