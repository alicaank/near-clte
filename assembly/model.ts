// contract/assembly/model.ts
import { u128,Context, storage, PersistentUnorderedMap, math,RNG } from "near-sdk-as";

export const players = new PersistentUnorderedMap<u32, Player>("players");

@nearBindgen
export class Game {
    counter: i32;
    owner: string;
    pot: u128;
    constructor() {
        const random = new RNG<i32>(1, 100); // random number between 1 and 100
        this.counter =random.next(); //assigne random number between 1 and 100
        this.owner = Context.sender;
        this.pot=u128.Zero;
    }
    increasePot(amount: u128): void {
        this.counter -= 1;
        this.pot = u128.add(this.pot, amount);
    }

}

@nearBindgen
export class Player {
  id: u32;
  balance: u128;
  sender: string;
  constructor(name:string,balance: u128) {
    this.id = math.hash32<string>(name);
    this.balance = balance
    this.sender = Context.sender;
  }
// 
  static insert(name: string): Player {
    assert(Context.attachedDeposit.toI32() < 0, "You must send a positive amount");
    assert(players.contains(math.hash32<string>(name)), "Player already exists");
    const player = new Player(name,Context.attachedDeposit);
    storage.set(name, player);
    players.set(player.id, player);
    return player;
  }

  static getFromStorage(key: string): Player {
    return storage.getSome<Player>(key);
  }
}



