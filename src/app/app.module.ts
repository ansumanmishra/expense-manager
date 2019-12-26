import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyByB5JHfXkNryCaf3ThR1s5uMhKV-1jUwY',
      authDomain: 'budget-planner-8c3f8.firebaseapp.com',
      databaseURL: 'https://budget-planner-8c3f8.firebaseio.com',
      projectId: 'budget-planner-8c3f8',
      storageBucket: 'budget-planner-8c3f8.appspot.com',
      messagingSenderId: '282861823749',
      appId: '1:282861823749:web:daa562415ebf345a5bf96c'
    }),
    AngularFireDatabaseModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
