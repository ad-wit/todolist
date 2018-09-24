import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { TodoService } from './todo.service';
import { CategoryComponent } from './category/category.component';
import { ListsComponent } from './list/lists.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ TodoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
