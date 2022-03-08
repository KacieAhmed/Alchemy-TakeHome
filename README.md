# How is Gas Calculated? 
##### After completing this guide, you will learn the fundamentals of how gas is calculated on the Ethereum blockchain. 
###### 10 minuted read 📖

If you have questions at any point feel free to reach out in the [Alchemy Discord](https://discord.com/invite/mMGsVgd)! 🚀

_______
### Gas fees

When learning blockchain development, you may have noticed that transactions made on the Ethereum network cost a fee. These fees are called *transaction fees*, and they are a fundamental concept in web3.

The purpose of transaction fees on the Ethereum network is to enable security and decentralization. By requiring a fee for every computation executed on the network, malicous users are prevented from spamming the network. Thus, cyber attacks that are difficult to defend against in web2 aren't even fesible to execute on the Ethereum network. A great example of this is how transaction fees and gas limits make it financially infeasible to execute a denial of service (DDOS) on Ethereum. 

Without transaction fees, vital consensus protcols like Proof of Work would also not work. Ethereum miners would not get paid, and several other important functions in the Ethereum network would fail. **But how are these fees calculated? Let's explore.**



## The London Upgrade (EIP-1559)

Before the London upgrade on August 5th, 2021, gas fees were calculated with the formula **gas fees = gas spent * gas price**. 

**Gas spent** is the total amount of gas required for a transaction, and **gas price** is the total amount of ether you are willing to pay per gas unit of execution. 

So if your transaction cost 30,000 units of gas, and your gas price is 200 [Gwei](https://www.investopedia.com/terms/g/gwei-ethereum.asp#:~:text=Gwei%20is%20a%20denomination%20of,interference%20from%20a%20third%20party.), then by the Pre-London upgrade formula (gas fee = 30,000 gas * 200 gwei) you will pay 6000000 Gwei or 0.006 ETH. 

**After the London Upgrade (or EIP-1559), gas fees are now calculated differently**. For the sake of optimization, gas is now calculated with the formula *gas fees = gas spent * (base fees + priority fees)*. 

The **base fee** is decided natively by the Ethereum network on a per block basis based on the demand for block space. In essence, the base fee represents the minimum price required to get your transaction included within a block. The **priority fee** is a tip you can pay to the miners to futher incentivize them to include your transaction on the blockchain. The higher your tip, the faster your transaction will be executed. 

Now that you understand the basics, let's demonstrate how to get gas prices in the new EIP-1559 standard. Follow along and code with us!

#### We will be building an application that displays gas fees in the EIP-1559 standard 🚀


## Step 1: Download Node.js

* The first step is to set up a node.js project. You can download node.js [here](https://nodejs.org/en/download/). 

* Once you have downloaded node.js, make sure to check if it installed properly by running the following command in your terminal:

 ```
 node -v
  ```
  
  You should get back something like:

 ```
 v14.15.0
  ```

## Step 2: Create a project folder

* Pick a location on your computer where you want to store the project, and create a folder. 

* I would reccomend doing this in your terminal, because you will need to use the terminal to install the correct packages into your project.

 ```
 cd documents
 mkdir GasProject
  ```

## Step 3: Install node & ethers into your project

 ```
 npm init
  ```
 * After running this command, select the default options for everything (just keep pressing enter)
 * You should see a file called 'package.json' after running this command.

 ```
 npm install ethers
  ```

 * After running this command, you should see two new files. One called 'node_modules', and one called	'package-lock.json'
  ## Step 4: Open your IDE and create a JavaScript file.

![](https://raw.githubusercontent.com/KacieAhmed/Alchemy-TakeHome/main/images/tut-1.png)


## Step 5: Create an Alchemy node

* First go to [Alchemy's website](https://www.alchemy.com/). 
* Then login to your account and head over to App's
![](https://raw.githubusercontent.com/KacieAhmed/Alchemy-TakeHome/main/images/Alchemy-1.png)

* Under apps, hit 'create app'. 
* Fill out the information properly. Make sure you select 'Ethereum' as the chain and 'ropsten' as the network.

![](https://raw.githubusercontent.com/KacieAhmed/Alchemy-TakeHome/main/images/Alchemy-2.png)

## Step 6: Set type 'module' in your package.json
* Go to package.json
* Add the line '  "type": "module", ' under '  "main": "index.js" 

 ```
 {
  "name": "tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ethers": "^5.5.4"
  }
}
  ```
## Step 7: Import JsonRpcProvider and ethers into your JavaScript file
* Go to scripts.js
* Paste the following code into your project.

 ```
 import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
  ```
* These imports will allow you to use pre-existing [functions from ether.js.](https://docs.ethers.io/v5/api/providers/provider/) 
* Without these imports, you would have to write the funcitons that reterive Ethereum blocks yourself. It is much eaiser to simply use pre-existing methods.

## Step 8: Define your provider

* Go to scripts.js
* Paste the following code into your project.

 ```
const provider = new JsonRpcProvider('YOUR ALCHEMY KEY HERE');
  ```
  
  * Replace the 'YOUR ALCHEMY KEY HERE' with the key of the node you created. 
  * This provider acts an interface to Ethereum. It allows you to talk to ethereum.

![](https://raw.githubusercontent.com/KacieAhmed/Alchemy-TakeHome/main/images/Alc-Key.png)

## Step 9: Build

* Go to script.js

* We want to build an application that displays gas fees in the EIP-1559 standard. In-order to do that, we need to reterive blocks from ethereum. The best way to retreive information like that is to use our provider to get the information we need. 

* In-order to do that, let's generate some key information using our provider. Since we want to build an application that displays gas fees in the EIP-1559 standard, let's store some important information.

* Ultimately, what we want is to have an array of Ethereum Blocks, and use that array of Ethereum Blocks to display the total gas fee + base fee + priority fee of each block. 
* In-order to do that, we are going to need to create three arrays. 
1. An array of block numbers. We will use these block numbers to reference the Ethereum blocks.
2. An array of Ethereum blocks. We will use these Ethereum blocks to get a Txn from each block.
3. An array of Txn's. We will use these Txn's to get the gas information from each block. 
4. We will also create arrays to store the gas information. 
 
 
  ```
  import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
const provider = new JsonRpcProvider('https://eth-ropsten.alchemyapi.io/v2/iyOKwQeJqxYftrbyCGJCZ1ias1go__jU');

async function main() {

//Gets the block numbers for the first and last block
    const firstBlock = await provider.getBlockNumber();
    let lastBlock = await firstBlock - 20;

    //Arrays to store the blocks and txn
    const listNumbers = [];
    const listBlocks = [];
    const listTxn = [];

    //Array to store the TOTAL gas fees
    const gasFees = [];

    //Arrays to store the parts that make up the gas fee
    const gasPrices = [];
    const gasUsed = [];
    const priorityFees = [];



}
main();
  ```
* Next we want to

  ```
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
const provider = new JsonRpcProvider('https://eth-ropsten.alchemyapi.io/v2/iyOKwQeJqxYftrbyCGJCZ1ias1go__jU');



async function main() {

    //Gets the block numbers for the first and last block
    const firstBlock = await provider.getBlockNumber();
    let lastBlock = await firstBlock - 20;

    //Arrays to store the blocks and txn
    const listNumbers = [];
    const listBlocks = [];
    const listTxn = [];

    //Array to store the TOTAL gas fees
    const gasFees = [];

    //Arrays to store the parts that make up the gas fee
    const gasPrices = [];
    const gasUsed = [];
    const priorityFees = [];


    //prints an array of each block's gas fees, priority fees, and gas spent
    for (let i = 0; i < 20; i++) {


        listNumbers[i] = lastBlock;
        listBlocks[i] = await provider.getBlock(lastBlock);
        listTxn[i] = await listBlocks[i].transactions[0];



        //prints the gas prices if the transaction id's are defined
        if (typeof listTxn[i] === 'undefined') {
            console.log('ERROR: Txn number is undefined');
        } else {

            //get array of gas prices in eth
            gasPrices[i] = await (await provider.getTransaction(listTxn[i])).gasPrice;
            // gasPrices[i] = ethers.utils.formatEther(gasPrices[i]);

            //get array of priority fees in wei
            //sometimes returns undefined
            priorityFees[i] = await (await provider.getTransaction(listTxn[i])).maxPriorityFeePerGas;

            //get array of gas used
            gasUsed[i] = await (await provider.getTransactionReceipt(listTxn[i])).gasUsed;


            //find gas fee by multiplying total gas used by gas price
            gasFees[i] = (gasPrices[i].mul(gasUsed[i]));

            //Printing out the gas fee + breakdown
            //Sometimes the priority fee is undefined, se we need an if statement

            if (typeof priorityFees[i] != 'undefined') {
                console.log('\n');
                console.log('-------');
                console.log('The base fee is of Block #' + listNumbers[i] + ' is ' + ethers.utils.formatEther(gasFees[i].sub(priorityFees[i])) + ' eth');
                console.log('The priority fee is of Block #' + listNumbers[i] + ' is ' + ethers.utils.formatEther(priorityFees[i]) + ' eth');
                console.log('The total gas fee is of Block #' + listNumbers[i] + ' is ' + ethers.utils.formatEther(gasFees[i]) + ' eth');
                console.log('-------');
                console.log('\n');
            }

        }
        lastBlock++;

    }

}
main();



  ```
