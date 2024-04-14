const { generateSeed, deriveKeypair } = require('ripple-keypairs');

const createWallet = () => {
    const seed = generateSeed(); // Generate a random seed
    const keypair = deriveKeypair(seed); // Derive keypair from the seed

    return {
        seed: seed,
        privateKey: keypair.privateKey,
        publicKey: keypair.publicKey,
        address: keypair.address,
    };
};

module.exports = {
    createWallet,
};
