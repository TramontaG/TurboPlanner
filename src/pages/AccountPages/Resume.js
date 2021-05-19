import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import AccountManager from './../../util/AccountManager';

import AccountInfoView from './../../components/AccountInfoView';

export default class Resume extends Component {
    constructor(props){
        super(props);
        this.state = {
            accounts: [],
        }

        this.props.navigation.addListener('focus', () => {
            this.updateAccountView();
        })
    }

    componentDidMount = () => {
        this.updateAccountView();
    }

    render = () => (
        <View>
            <Text>Resume Page</Text>

            <FlatList 
                data={this.state.accounts}
                renderItem = {({item}) => <AccountInfoView accountObject={item} />}
                keyExtractor= {item => item.id.toString()}
            />
            
        </View>
    );

    retrieveAllAccounts = () => AccountManager.getAllAccounts();

    updateAccountView = () => this.setState({accounts: this.retrieveAllAccounts()});
    
}