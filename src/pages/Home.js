import React, {} from 'react';
import { View, Text, Button, BackHandler, Alert, FlatList, TextInput } from 'react-native';

import AccountManager from './../util/AccountManager';
import BalanceHomeView from './../components/balanceHomeView';
import ProgressBar from './../components/ProgressBar';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        BackHandler.addEventListener("hardwareBackPress", this.confirmExit);
        this.state = {
            balance: 0,
            percentage: .5,
        }
    }



    render = () => (
        <View>
            <BalanceHomeView balance={this.state.balance} />
            <ProgressBar percentage={this.state.percentage} />
        </View>
    );



}