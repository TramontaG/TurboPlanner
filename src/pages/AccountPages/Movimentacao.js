import React from 'react';
import {
    View,
    Text,
    Button,
    BackHandler,
    Alert,
    FlatList,
    TextInput,
    CheckBox,
    Picker,
} from 'react-native';

import AccountManager from '../../util/AccountManager';
import Header from './../../components/Header';

import AccountInfoView from '../../components/AccountInfoView';
import GenericContainer from '../../components/GenericContainer';
import HistoryController from '../../util/HistoryManager';

import {TextInputMask} from 'react-native-masked-text';
import MovementInfoView from '../../components/MovementInfoView';

export default class Movimentacao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: props.route.params,
            category: '',
            value: 0,
            op: 'Crédito',
            categoryList: [],
        };
    }

    componentDidMount() {
        const allCategories = AccountManager.getAllCategories();
        this.setState({categoryList: allCategories});
    }

    render = () => (
        <View style={{flex: 1}}>
            <Header text="Movimentação da conta" />
            <GenericContainer visible={true}>
                <Text>Categoria</Text>

                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(value) => this.setState({category: value})}>
                    {this.state.categoryList.map((category) => {
                        return (
                            <Picker.Item
                                label={category.name}
                                value={category.id}
                                key={category.id}
                            />
                        );
                    })}
                </Picker>

                <Text>Valor:</Text>
                <TextInputMask
                    type="money"
                    maskType="BRL"
                    value={this.state.value}
                    onChangeText={(text) => this.setState({value: text})}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Recebendo</Text>
                        <CheckBox
                            value={this.state.op == 'Crédito'}
                            onValueChange={() => this.setOP('Crédito')}
                        />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Gastando</Text>
                        <CheckBox
                            value={this.state.op == 'Débito'}
                            onValueChange={() => this.setOP('Débito')}
                        />
                    </View>
                </View>

                <Button
                    title="Inserir movimentação"
                    onPress={this.insertMovement}
                />
            </GenericContainer>
            <FlatList
                style={{flex: 1}}
                data={this.state.account.history}
                renderItem={({item}) => (
                    <MovementInfoView
                        movement={item}
                        deleteRoutine={this.deleteMovement}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

    updateAccountData = () => {
        const updatedAccountData = AccountManager.getAccount(
            this.state.account.id,
        );
        this.setState({account: updatedAccountData});
    };

    setOP = (op) => {
        this.setState({op: op});
    };

    insertMovement = () => {
        const valueInCents = Number(this.state.value.replace(/[^0-9]/g, ''));

        const movementInfo = {
            type: this.state.op,
            category: AccountManager.getCategory(this.state.category),
            value: parseInt(valueInCents),
        };
        if (this.state.op == 'Débito') movementInfo.value *= -1;
        AccountManager.insertMovement(this.state.account.id, movementInfo);
        this.updateAccountData();
    };

    deleteMovement = (movementId) => {
        AccountManager.deleteMovement(this.state.account.id, movementId);
        this.updateAccountData();
    };
}
