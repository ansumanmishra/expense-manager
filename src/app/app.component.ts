import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Expense} from './expense.model';
import {AngularFirestore} from '@angular/fire/firestore';

export type User = 'Ansuman' | 'Debasrita';
export type Card = 'Forex' | 'TranseferWise' | 'CreditSuisse' | 'UbsDebit' | 'UbsCredit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'expense-manager';
  cards: Card[] = ['Forex', 'TranseferWise', 'CreditSuisse', 'UbsDebit', 'UbsCredit'];
  users: User[] = ['Ansuman', 'Debasrita'];
  displayedColumns: string[] = ['user', 'card', 'date', 'amount'];
  expenses: Expense[] = [
    new Expense('Ansuman', 'TranseferWise', '12/26/2019', 15),
    new Expense('Debasrita', 'UbsCredit', '12/26/2019', 20)
  ];
  dataSource: MatTableDataSource<Expense>;
  expenseForm: FormGroup;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {

  }

  ngOnInit() {
    this.createExpenseForm();
    this.firestore.collection('expense').snapshotChanges().subscribe(data => {
      this.expenses = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Expense;
      });
      console.log(this.expenses);
      this.createExpenseTable();
    });
  }

  private createExpenseForm() {
    this.expenseForm = this.fb.group({
      user: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      date: ['', [Validators.required]],
      card: ['', [Validators.required]]
    });

    this.setDefaultExpense();
  }

  setDefaultExpense() {
    this.expenseForm.setValue({
      user: 'Ansuman',
      amount: null,
      date: new Date(),
      card: 'TranseferWise',
    });
  }

  onSubmit() {
    // this.expenses.push(this.expenseForm.value);

    this.firestore.collection('expense').add(this.expenseForm.value).then(console.log);
    this.createExpenseTable();
    this.setDefaultExpense();
  }

  private createExpenseTable() {
    this.dataSource = new MatTableDataSource(this.expenses);
    this.dataSource.sort = this.sort;
  }
}
