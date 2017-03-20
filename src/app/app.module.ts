import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { DiffService } from './diff.service';
import { RuleSelectorComponent } from './rule-selector/rule-selector.component';
import { RuleViewComponent } from './rule-view/rule-view.component';
import { CardItemComponent } from './card-item/card-item.component';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RuleSelectorComponent,
    RuleViewComponent,
    CardItemComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BackendService, DiffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
