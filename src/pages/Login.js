import React from 'react';
import { View, Text, Button, Alert, BackHandler } from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <View>
            <Text>This is the Login Screen</Text>
            <Button title="Login" onPress={() => this.props.navigation.navigate("BottomTabs")} />
        </View>
    );
}