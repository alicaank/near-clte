```
# Near - Come Last, Take Everything.

It is a small game where a user can create a chance game.. When the game is created, a random number between 1-100 chosen as a counter.  Each time the play function is called, counter is reduced by 1 and the player who sets the counter to 0 wins the game.


# Cloning the project
After cloning the project please run 

    yarn
in order to install all of the necessary packages for the project to run correctly.

## Building and Deploying the contract

The contract is located in under the assembly folders, after editing the contract you can run
    yarn build
in order to build the contract and get the .wasm file.

If you want to build and deploy the contract for update, at the same time, you can run 
    yarn dev
    
If you create a new contract, you can run 
	yarn deployInit


After the contract is deployed, it is necessary to run the following command in the terminal in order to be able to run the contract
    export CONTRACT=ACCOUNT_ID

## Running the contract

The game can be played using the Play function. 
 

# Functions
## play 

 - Does not take any parameters.
 - Player must attach a deposit > 0 in order to play the game

**Example call:**
`near call $CONTRACT play --account_id $NEAR_ACCOUNT --amount 0.1


# Scripts
##Deploy
You can run scripts/deploy.sh for build and deploy the contract.

##Run
Before run scripts/run.sh
You should run following commands in the terminal
export ACCOUNT_ID=account_id
export CONTRACT=ACCOUNT_ID // If you are creator
export CONTRACT=contract_address // If you are player
export AMOUNT=amount of money you want to use for game


```
