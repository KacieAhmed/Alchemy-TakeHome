
import { JsonRpcProvider } from '@ethersproject/providers'
import axios from 'axios';
import { ethers } from 'ethers';
const provider = new JsonRpcProvider('https://eth-ropsten.alchemyapi.io/v2/Xp7IPG-NXVWb0UOa15gM8yqefzZAifan');


let gasUnder12A05F200 = false;
const gasConstant = 5000000000;

while(true){

    //get list of blocks
    const blockLoop = await provider.getBlockNumber();
    const blocksList = await provider.getBlock(blockLoop);
    const txnList = await blocksList.transactions[0];
   
//Sometimes, txn is undefined. So we must use a seprate counter in-order to avoid trying to call a function on an undefined array element
    
    if(typeof txnList === 'undefined'){
        console.log('ERROR: No Txn number found');
       
    }else{
        
    }
   const gasPrices =  (await provider.getTransaction(txnList)).gasPrice;
   
    if (gasPrices < gasConstant){
        gasUnder12A05F200 = true;
        for (let url of webookEndpoints) {
            axios.post(url, {gas: bignumberValue.toString()})
            }
        }else{
            gasUnder12A05F200 = false;
        }

    console.log(gasPrices, gasUnder12A05F200);
    

}