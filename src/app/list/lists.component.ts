import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ICategory } from './category';
import { IListItem } from './list-item';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  categories: ICategory[];

  listItems: IListItem[];

  completeListItems: IListItem[];

  incompleteListItems: IListItem[];

  constructor( private todoService: TodoService ) { }

  getCategories(): void {

    this.categories = this.todoService.getCategories();
  }

  getListItems(): void {

    if( this.categories.length > 0 ) {

      let initialId = this.categories[0].id;
      this.listItems = this.todoService.getListItems(initialId);
    }
  }

  addCategory(categoryName: string): void {
    categoryName = categoryName.trim();
    if( categoryName != '' )
      this.todoService.addCategory(categoryName);
  }

  updateList(categoryId: number): void {

    this.listItems = this.todoService.getListItems(categoryId);
    this.completeListItems = this.listItems.filter((item: IListItem) => item.isComplete == true);
    this.incompleteListItems = this.listItems.filter((item: IListItem) => item.isComplete == false);
  }

  addItem(itemName: string, categoryId: number): void {

    itemName = itemName.trim();
    if( itemName != '' )
      this.incompleteListItems.push(this.todoService.addItem(itemName, categoryId));
  }

  updateListItem(listItem: IListItem): void {

    listItem.isComplete = !listItem.isComplete;

    if( listItem.isComplete ) {
      this.incompleteListItems = this.incompleteListItems.filter( (item: IListItem) => item.id != listItem.id );
      this.completeListItems.push(listItem);
    } else {
      this.completeListItems = this.completeListItems.filter( (item: IListItem) => item.id != listItem.id );;
      this.incompleteListItems.push(listItem);
    }

    this.todoService.updateListItem(listItem);
  }

  deleteItem(listItem: IListItem): void {

    this.listItems = this.listItems.filter( (item: IListItem) => item.id != listItem.id );

    if( listItem.isComplete ) {
      this.completeListItems = this.completeListItems.filter( (item: IListItem) => item.id != listItem.id );
    } else {
      this.incompleteListItems = this.incompleteListItems.filter( (item: IListItem) => item.id != listItem.id );
    }
  }

  ngOnInit() {

    this.categories = this.todoService.getCategories();

    if( this.categories.length > 0 ) {
      let initialId = this.categories[0].id;
      this.listItems = this.todoService.getListItems(initialId);
      this.completeListItems = this.listItems.filter((item: IListItem) => item.isComplete == true);
      this.incompleteListItems = this.listItems.filter((item: IListItem) => item.isComplete == false);
    }
  }

}
