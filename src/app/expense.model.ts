import {Card, User} from './app.component';

export class Expense {

  constructor(public user: User, public card: Card, public date: string, public amount: number) {

  }
}
