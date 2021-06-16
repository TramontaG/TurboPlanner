import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';

import AccountManager from './../../util/AccountManager';
import Header from './../../components/Header';
import AccountInfoView from './../../components/AccountInfoView';
import GenericContainer from '../../components/GenericContainer';

import {centsToReal} from './../../util/Conversor';
import {TextInputMask} from 'react-native-masked-text';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: [],
            accountName: '',
            initialBalance: '0',
        };
    }

    componentDidMount() {
        this.getAllAccounts();
    }

    render = () => (
        <View style={{flex: 1, backgroundColor: '#DDE5DD'}}>
            <Header text="Minhas contas" />

            <GenericContainer visible={true}>
                <Text>Criar conta:</Text>
                <TextInput
                    placeholder="Nome da Conta"
                    value={this.state.accountName}
                    onChangeText={(text) => this.setState({accountName: text})}
                />
                <Text>Saldo inicial:</Text>
                <TextInputMask
                    type="money"
                    maskType="BRL"
                    value={this.state.initialBalance}
                    onChangeText={(text) =>
                        this.setState({initialBalance: text})
                    }
                />

                <Button title="Criar conta" onPress={this.createAccount} />
            </GenericContainer>

            <FlatList
                data={this.state.accountList}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('Movimentacao', item)
                        }>
                        <AccountInfoView accountObject={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

    createAccount = () => {
        const balanceInCents = Number(
            this.state.initialBalance.replace(/[^0-9]/g, ''),
        );
        AccountManager.createAccount({
            name: this.state.accountName,
            balance: balanceInCents,
        });
        this.getAllAccounts();
    };

    getAllAccounts = () => {
        const allAccounts = AccountManager.getAllAccounts();
        this.setState({accountList: allAccounts});
        console.log(allAccounts);
    };
}
