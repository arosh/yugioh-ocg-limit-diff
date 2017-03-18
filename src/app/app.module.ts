import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RuleListService} from './rule-list.service';
import { RuleSelectorComponent } from './rule-selector/rule-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    RuleSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RuleListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
