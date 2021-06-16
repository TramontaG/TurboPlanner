import React from 'react';
import {Text} from 'react-native';

import {centsToReal} from './../util/Conversor';
import GenericContainer from './GenericContainer';

const AccountInfo = (props) => {
    const accountObject = props.accountObject;

    const calculateBalance = (accountObject) => {
        return accountObject.history.reduce((acc, item) => {
            return acc + item.value;
        }, accountObject.balance);
    };

    return (
        <GenericContainer visible={true}>
            <Text>{accountObject.name}</Text>
            <Text>
                Saldo: R$
                {centsToReal(calculateBalance(accountObject))}
            </Text>
        </GenericContainer>
    );
};

export default AccountInfo;
