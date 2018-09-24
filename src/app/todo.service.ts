import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ICategory } from './category/category';
import { IListItem } from './list/list-item';

@Injectable()

export class TodoService {

  private defaultCategories: ICategory[] = [
    {
      "id": 1,
      "name": 'shopping list'
    },
    {
      "id": 2,
      "name": 'work list'
    },
    {
      "id": 3,
      "name": 'europe trip'
    }
  ];

  private defaultListItems: IListItem[] = [
    {
      "id": 1,
      "name": 'pen',
      "categoryId": 2,
      "isComplete": false
    },
    {
      "id": 2,
      "name": 'paper clips',
      "categoryId": 2,
      "isComplete": true
    },
    {
      "id": 3,
      "name": 'plant',
      "categoryId": 2,
      "isComplete": true
    },
    {
      "id": 4,
      "name": 'jacket',
      "categoryId": 3,
      "isComplete": false
    },
    {
      "id": 5,
      "name": 'gloves',
      "categoryId": 3,
      "isComplete": false
    },
    {
      "id": 6,
      "name": 'milk',
      "categoryId": 1,
      "isComplete": false
    }
  ];

  constructor() { }

  getCategories(): Observable<ICategory[]> {

    return of(Object.assign([], this.defaultCategories));
  }

  addCategory(categoryName: string): Observable<ICategory> {

    let newId: number;

    if( this.defaultCategories.length > 0 ) {

      newId = this.defaultCategories[this.defaultCategories.length-1].id + 1;
    } else {

      newId = 1; 
    }

    let newCategory: ICategory = {
      "id": newId,
      "name": categoryName
    }

    this.defaultCategories.push(newCategory);

    return of(newCategory);
  }

  deleteCategory(categoryId: number):  Observable<ICategory> {

    let deleteCategory: ICategory = this.defaultCategories.find((category: ICategory) => category.id == categoryId);

    this.defaultCategories = this.defaultCategories.filter((category: ICategory) => category.id != categoryId);

    this.defaultListItems = this.defaultListItems.filter((item: IListItem) => item.categoryId != deleteCategory.id);
    
    return of(deleteCategory);
  }

  getListItems(categoryId: number): Observable<IListItem[]> {

    let listItems = this.defaultListItems.filter( (listItem: IListItem) => listItem.categoryId == categoryId );
    
    return of(Object.assign([], listItems));
  }

  addItem(ListItemName: string, categoryId: number): Observable<IListItem> {

    let newId: number;

    if( this.defaultListItems.length > 0 ) {

      newId = this.defaultListItems[this.defaultListItems.length-1].id + 1;
    } else {

      newId = 1; 
    }

    let newListItem: IListItem = {
      "id"        : newId,
      "name"      : ListItemName,
      "categoryId": categoryId,
      "isComplete": false
    }

    this.defaultListItems.push(newListItem);
    return of(newListItem);
  }

  updateListItem(listItem: IListItem): Observable<IListItem> {

    this.defaultListItems = this.defaultListItems.filter((item: IListItem) => item.id != listItem.id);
    listItem.isComplete = !listItem.isComplete;
    this.defaultListItems.push(listItem);

    return of(listItem);
  }

  deleteListItem(listItem: IListItem): Observable<IListItem> {

    this.defaultListItems = this.defaultListItems.filter((item: IListItem) => item.id != listItem.id);
    
    return of(listItem);
  }

}
