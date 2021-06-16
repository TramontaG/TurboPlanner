const centsToReal = (cents) => {
    return (Number(cents) / 100).toFixed(2).toString().replace('.', ',');
};

export {centsToReal};
