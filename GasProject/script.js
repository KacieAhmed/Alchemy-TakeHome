import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
const provider = new JsonRpcProvider('https://eth-ropsten.alchemyapi.io/v2/iyOKwQeJqxYftrbyCGJCZ1ias1go__jU');



async function main() {

    //Gets the block numbers for the first and last block
    const firstBlock = await provider.getBlockNumber();
    let lastBlock = await firstBlock - 20;

  
    for (let i = 0; i < 20; i++) {

        const block = await provider.getBlock(lastBlock);
        const txn = await block.transactions[0];



        //prints the gas prices if the transaction id's are defined
        if (typeof txn === 'undefined') {
            console.log('ERROR: Txn number is undefined');
        } else {

            
            const gasPrice = (await provider.getTransaction(txn)).gasPrice;
            

        
            const priorityFees = (await provider.getTransaction(txn)).maxPriorityFeePerGas;

            
            const gasUsed = (await provider.getTransactionReceipt(txn)).gasUsed;


            //find gas fee by multiplying total gas used by gas price
            const gasFees = (gasPrice.mul(gasUsed));

            //Printing out the gas fee + breakdown
          

            if (typeof priorityFees != 'undefined') {
                console.log('\n');
                console.log('-------');
                console.log('The base fee is of Block #' + lastBlock + ' is ' + ethers.utils.formatEther(gasFees.sub(priorityFees)) + ' eth');
                console.log('The priority fee is of Block #' + lastBlock + ' is ' + ethers.utils.formatEther(priorityFees) + ' eth');
                console.log('The total gas fee is of Block #' + lastBlock + ' is ' + ethers.utils.formatEther(gasFees) + ' eth');
                console.log('-------');
                console.log('\n');
            }

        }
        lastBlock++;

    }

}
main();