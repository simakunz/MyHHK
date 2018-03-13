import { StarComponent } from './shared/star.component';
import { HHKTableComponent } from './tableview/hhk-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConvertFX } from './shared/convertFX.pipe';
import { InvestTableComponent } from './tableview/invest-table.component';
import { InvestTableDetailComponent } from './tableview/invest-table-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HHKTableComponent,
    ConvertFX,
    StarComponent,
    InvestTableComponent,
    InvestTableDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // the sequence of the routing matters! <=> less important ones always at the bottom
    RouterModule.forRoot([
      {path: 'hhk-table', component: HHKTableComponent},
      {path: 'invest-table', component: InvestTableComponent},
      {path: 'invest-table/:id', component: InvestTableDetailComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      // next route ('**' is usually redirected to PageNotFound
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}

    ])
    // in case of # routes, the code would look like:
    // RouterModule.forRoot([], {useHas: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
