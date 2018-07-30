import { StarComponent } from './shared/star.component';
import { HHKTableComponent } from './hhk-table/hhk-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConvertFX } from './shared/convertFX.pipe';
import { InvestTableComponent } from './invest-table/invest-table.component';
import { InvestTableDetailComponent } from './invest-table-detail/invest-table-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { InvestGuardService } from './invest-table/invest-guard.service';
import { MessagesComponent } from './messages/message.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryHHKService } from './hhk-table/in-memory-hhk.service';
import { AddExpenseComponent } from './add-expense/add-expense.component';


@NgModule({
  declarations: [
    AppComponent,
    HHKTableComponent,
    ConvertFX,
    StarComponent,
    InvestTableComponent,
    InvestTableDetailComponent,
    WelcomeComponent,
    MessagesComponent,
    AddExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // the sequence of the routing matters! <=> less important ones always at the bottom
    HttpClientInMemoryWebApiModule.forRoot( InMemoryHHKService ),
    RouterModule.forRoot([
      {path: 'hhk-table', component: HHKTableComponent},
      {path: 'invest-table', component: InvestTableComponent},
      {path: 'invest-table/:id',
          canActivate: [ InvestGuardService ],
          component: InvestTableDetailComponent},
      {path: 'add-expense', component: AddExpenseComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      // next route ('**' is usually redirected to PageNotFound
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}

    ])
    // in case of # routes, the code would look like:
    // RouterModule.forRoot([], {useHas: true})
  ],
  providers: [InvestGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
