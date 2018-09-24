import { Component, OnInit, Input } from '@angular/core';

import { TodoService } from '../todo.service';
import { ICategory } from '../category/category';
import { IListItem } from './list-item';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  _selectedCategory: ICategory;

  @Input() set selectedCategory(category: ICategory) {

    this._selectedCategory = category;
    this.getListItems();
  };

  listItems: IListItem[];

  completeListItems: IListItem[];

  incompleteListItems: IListItem[];

  constructor( private todoService: TodoService ) { }

  getListItems(): void {

    if( this._selectedCategory != undefined ) {

      this.todoService.getListItems(this._selectedCategory.id)
        .subscribe(
          (listItems: IListItem[]) => {
            this.listItems = listItems;
            this.completeListItems = listItems.filter( (item: IListItem) => item.isComplete == true );
            this.incompleteListItems = listItems.filter( (item: IListItem) => item.isComplete == false );
        });
    }
  }

  addListItem(ListItemName: string): void {

    ListItemName = ListItemName.trim();

    if( ListItemName != '' ) {

      this.todoService.addItem(ListItemName, this._selectedCategory.id)
        .subscribe(
          (addedItem: IListItem) => {
            
            this.incompleteListItems.push(addedItem);
            this.listItems.push(addedItem);
        });
    }
  }

  updateListItem(listItem: IListItem): void {

    this.todoService.updateListItem(listItem)
    .subscribe(
      (updatedListItem: IListItem) => {
        
        if( updatedListItem.isComplete ) {
          this.incompleteListItems = this.incompleteListItems.filter( (item: IListItem) => item.id != listItem.id );
          this.completeListItems.push(updatedListItem);
        } else {
          this.completeListItems = this.completeListItems.filter( (item: IListItem) => item.id != listItem.id );;
          this.incompleteListItems.push(updatedListItem);
        }
      });
  }

  deleteListItem(listItem: IListItem): void {

    this.todoService.deleteListItem(listItem)
    .subscribe(
      (deletedListItem: IListItem) => {
        
        this.listItems = this.listItems.filter( (item: IListItem) => item.id != deletedListItem.id );
    
        if( deletedListItem.isComplete ) {
          this.completeListItems = this.completeListItems.filter( (item: IListItem) => item.id != deletedListItem.id );
        } else {
          this.incompleteListItems = this.incompleteListItems.filter( (item: IListItem) => item.id != deletedListItem.id );
        }
      });
  }

  ngOnInit() {

  }

}
