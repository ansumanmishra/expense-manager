import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Expense} from './expense.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';

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
  displayedColumns: string[] = ['user', 'card', 'date', 'amount', 'id'];
  expenses: Expense[] = [];
  dataSource: MatTableDataSource<Expense>;
  expenseForm: FormGroup;
  totalExpense: number;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('toast', {static: true}) toast;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.createExpenseForm();
    this.firestore.collection('expense').snapshotChanges().subscribe(data => {
      this.expenses = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Expense;
      }).sort((a: any, b: any) => b.date.seconds - a.date.seconds );
      this.totalExpense = this.expenses.map( expense => expense.amount).reduce((a, b) => a + b, 0);
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
    this.firestore.collection('expense').add(this.expenseForm.value);
    this.snackBar.openFromTemplate(this.toast, {
      duration: 1000,
    });
    this.createExpenseTable();
    this.setDefaultExpense();
  }

  private createExpenseTable() {
    this.dataSource = new MatTableDataSource(this.expenses);
    this.dataSource.sort = this.sort;
  }

  deleteExpense(id: string) {
    this.firestore.doc<Expense>(`expense/${id}`).delete().then( _ => {
      this.snackBar.open('Expense deleted');
      setTimeout( () => {
        this.snackBar.dismiss();
      }, 2000);
    });
  }

}
