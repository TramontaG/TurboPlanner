import React from 'react';
import { View, Text, Button, BackHandler, Alert, FlatList, TextInput } from 'react-native';

import AccountManager from './../util/AccountManager';

import AccountInfoView from './../components/AccountInfoView';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        BackHandler.addEventListener("hardwareBackPress", this.confirmExit);
        this.state = {
            contas: [],
            search: '',
        }
    }

    componentDidMount = async () => {
        await AccountManager.init();
        this.updateAccountsView();
    }

    render = () => (
        <View>
            <Text>This is the Home Screen</Text>
            <Button title="CreateAccount" onPress={() => this.createAccount()}/>
            <Button title="Delete all accounts" onPress={() => this.deleteAllAccounts()}/>
            <Button title="debug navigation" onPress={() => console.log(this.props.navigation)}/>

            <TextInput 
                value={this.state.search}
                onChangeText={text => this.setState({search: text})}
            />

            <Button title="SearchConta" onPress={() => this.searchConta()} />
            <Button title="DeleteConta" onPress={() => this.deleteAccount()} />

            <FlatList 
                data={this.state.contas}
                renderItem={({item}) => <AccountInfoView accountObject={item} />}
                keyExtractor={item => item.id.toString()}
            />
            
     
        </View>
    );

    updateAccountsView = () => {
        this.setState({contas: AccountManager.getAccountList(this.state.database)}); 
    }

    createAccount = () => {
        const conta = AccountManager.createAccount({
            name: 'ContaTeste',
        });
        console.log(conta);
        this.updateAccountsView();
    }

    deleteAccount = () => {
        const { search } = this.state;
        AccountManager.deleteAccount(parseInt(search));
        this.updateAccountsView();
    }

    deleteAllAccounts = () => {
        console.log(AccountManager._deleteAllAccounts(this.state.database));
        this.updateAccountsView();
    }

    searchConta = () => {
        const { search } = this.state;
        const conta = AccountManager.getAccount(parseInt(search));
        console.log(conta);
    }

    confirmExit = () => {
        if (this.props.navigation.canGoBack()) return false;
        console.log("Preventing going back");
        Alert.alert('Exit App','Do you want to exit?',[
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],{ cancelable: true });
        return true;
    }
}