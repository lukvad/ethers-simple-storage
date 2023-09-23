import {ethers} from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

async function main() {

    
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
    const encryptedJson = fs.readFileSync("./encryptedKeyTs.json", "utf-8");
    let wallet = ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PVT_KEY_PSW!
    )
    wallet = await wallet.connect(provider);
    const abi = fs.readFileSync("./Lottery_sol_Lottery.abi" , "utf-8");
    const binary = fs.readFileSync("./Lottery_sol_Lottery.bin" , "utf-8");
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying contract, wait");
    const contract = await contractFactory.deploy();
    console.log(contract);
    
    // const txReceipt = await contract.deploymentTransaction.wait(1);
    // console.log(txReceipt);
}

main()
    .then(()=> process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });