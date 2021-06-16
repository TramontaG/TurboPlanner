import React from 'react';
import {View, Text, BackHandler, FlatList, Button} from 'react-native';

import BalanceHomeView from './../components/balanceHomeView';
import AccountInfoView from './../components/AccountInfoView';

import AccountManager from './../util/AccountManager';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        props.navigation.addListener('focus', this.getAllAccounts);
        this.state = {
            balance: 0,
            accountList: [],
        };
    }

    componentDidMount() {
        this.getAllAccounts();
    }

    render = () => (
        <View style={{flex: 1, backgroundColor: '#DDE5DD'}}>
            <BalanceHomeView balance={this.state.balance} />

            <FlatList
                data={this.state.accountList}
                renderItem={({item}) => (
                    <AccountInfoView accountObject={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

    calculateBalance = (accountObject) => {
        return accountObject.history.reduce((acc, item) => {
            return acc + item.value;
        }, accountObject.balance);
    };

    getAllAccounts = () => {
        const allAccounts = AccountManager.getAllAccounts();
        const totalBalance = allAccounts.reduce(
            (acc, account) => acc + this.calculateBalance(account),
            0,
        );
        this.setState({
            balance: totalBalance,
            accountList: allAccounts,
        });
    };
}
