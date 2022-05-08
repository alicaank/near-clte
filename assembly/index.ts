import { Game, Player } from "./model";
import { u128,logging,ContractPromiseBatch,Context, PersistentUnorderedMap, math, context } from "near-sdk-as";





/*
 Contract Class for the game
*/
@nearBindgen
export class Contract {
  private owner: string;
  private game: Game;
  private winner: string;
  private players: PersistentUnorderedMap<u32, Player>= new PersistentUnorderedMap<u32, Player>("players");
  constructor() {
    this.owner = Context.sender;
    this.game = new Game();
    this.winner="";
  }
  // Get Owner of the contract
  get_owner(): string {
    return this.owner;
  }
  // Get winner of the game
  get_winner(): string {
    return this.winner;
  }
  // Play the game
  play(): void {
    // if player not send a positive amount then throw error
    assert(context.attachedDeposit.toI32() <= 0, "You must send a positive amount");
    // if player already exists then throw error
    assert(!this.players.contains(math.hash32<string>(Context.sender)), "Player already exists");
    const sender = Context.sender;
    // create new player
    const player = new Player(sender, context.attachedDeposit);
    // set player in the players map
    this.players.set(math.hash32<string>(sender),player);
    // increase the game pot by the amount of the deposit
    this.game.increasePot(context.attachedDeposit);
    // increase the game counter
    // if the game counter is 0 then set the winner to the player
    if (this.game.counter == 0) {
      this.players.clear();
      this.winner = sender;
      this.payout();
    }
    // if the game counter is not 0 then player loses
    else{
      this.lose(sender);
    }
  
  }
 // Lose executes when player does not win
  private lose(sender: string): void {
    logging.log(sender + " did not win. You Lose");
  }
  // Payout executes when player wins
  private payout(): void {
    logging.log(this.winner + " won " + this.game.pot.toString() + "!");
    // if the winner is the owner then throw error
    assert(this.winner != this.owner, "You cannot win");
    if (this.winner.length > 0) {
      // if the winner is not the owner then send the amount to the winner
      logging.log("Send " + this.game.pot.toString() + " to " + this.winner);
      const to_winner = ContractPromiseBatch.create(this.winner);
      // transfer payout to winner
      to_winner.transfer(this.game.pot);


    }
  }

}