// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

//import user input functionality
const prompt = require('prompt-sync')();

// Create a new keypair
const newPair = new Keypair();

// Extract the public key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key: ", publicKey);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Get balance of the user provided wallet address
        const walletBalance = await connection.getBalance(new PublicKey(publicKey));
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

// i have knowlege of prompt some people use readline kind of thing
const giveadd = prompt("Enter your public address ")

const airDropSol = async () => {
    try {
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to the wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(giveadd),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();

