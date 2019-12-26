import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Expense} from './expense.model';

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
  dataSource = new MatTableDataSource(this.expenses);
  expenseForm: FormGroup;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.createExpenseForm();
  }

  private createExpenseForm() {
    this.expenseForm = this.fb.group({
      user: ['Ansuman'],
      amount: [''],
      date: [new Date()],
      card: ['TranseferWise']
    });
  }
}
