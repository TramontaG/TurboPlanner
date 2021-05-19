import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import AccountManager from './../../util/AccountManager';

import MovementInfoView from './../../components/MovementInfoView'; 

export default class Overview extends Component {
    constructor(props){
        super(props);
        this.state = {
            account: props.route.params,
            history: [],
        };
    }

    componentDidMount = () => {
        this.setState({history: this.state.account.history});
    }

    render = () => (
        <View>
            <Text>Overview Page</Text>
            <Text>Account id: {this.state.account.id}</Text>
            <Text>Account Initial Balance: {this.state.account.balance}</Text>
            <Text>Account Balance: {this.calculateBalance(this.state.account)}</Text>
            <Text>Account Movement Total: {this.calculateBalance(this.state.account)}</Text>

            <Text>-------------------------------------------</Text>
            <Text>Movement List</Text> 
            <Text>-------------------------------------------</Text>

            <FlatList
                data={this.state.history}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <MovementInfoView movement={item} />}
            />

        </View>
    )

        

    calculateBalance = accountObject => {
        return accountObject.history.reduce( (acc, item) => {
            return acc + item.value;
        }, accountObject.balance) / 100;
    }
}