import { StarComponent } from './shared/star.component';
import { HHKTableComponent } from './tableview/hhk-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConvertFX } from './shared/convertFX.pipe';
import { InvestTableComponent } from './tableview/invest-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HHKTableComponent,
    ConvertFX,
    StarComponent,
    InvestTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
