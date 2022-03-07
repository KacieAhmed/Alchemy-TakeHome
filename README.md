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

## Step 5: Set type 'module' in your package.json
* Go to package.json

![](https://raw.githubusercontent.com/KacieAhmed/Alchemy-TakeHome/main/images/module.png)

