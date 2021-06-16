const calculateBalance = (accountObject) => {
    return (
        accountObject.history.reduce((acc, item) => {
            return acc + item.value;
        }, accountObject.balance) / 100
    );
};

const calculateMovementTotal = (accountObject) => {
    return (
        accountObject.history.reduce((acc, item) => {
            return acc + item.value;
        }, 0) / 100
    );
};
