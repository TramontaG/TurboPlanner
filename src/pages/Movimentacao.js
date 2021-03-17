import React from 'react';
import { View, Text, Button, BackHandler, Alert, FlatList, TextInput, CheckBox} from 'react-native';

import AccountManager from '../util/AccountManager';

import AccountInfoView from './../components/AccountInfoView';

export default class Movimentacao extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contas: [],
            search: '',
            account: '',
            value: '',
            op: 'Crédito'
        }

        props.navigation.addListener('focus', this.updateAccountsView);
    }

    componentDidMount = async () => {
        await AccountManager.init();
        this.updateAccountsView();
    }


    render = () => (
        <View>
            <Text>This is the Settings Screen</Text>
            <Text>Select the account you want to manipulate</Text>

            <TextInput 
                value={this.state.account}
                onChangeText={text => this.setState({account: text})}
            />

            <Button title="SearchAccount" onPress={() => this.searchConta()}/>
        
            <Text>Value to be added to history</Text>

            <TextInput 
                value={this.state.value}
                onChangeText={text => this.setState({value: text})}
            />

            <Text>Crédito</Text>
            <CheckBox value={this.state.op == "Crédito"} onValueChange={() => this.setOP('Crédito')}/>

            <Text>Débito</Text>
            <CheckBox value={this.state.op == "Débito"} onValueChange={() => this.setOP('Débito')} />

            <Button title="InsertMovement" onPress={() => this.insertMovement()} />

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

    setOP = op => {
        this.setState({op: op});
    }

    insertMovement = () => {
        const movementInfo = {
            type: this.state.op,
            value: parseInt(this.state.value),
        }
        if (this.state.op == "Débito") movementInfo.value *= -1;
        AccountManager.insertMovement(this.state.account, movementInfo);
        this.updateAccountsView();
    }

    searchConta = () => {
        const { account } = this.state;
        const conta = AccountManager.getAccount(parseInt(account));
        console.log(conta);
    }
}