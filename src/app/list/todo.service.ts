import { Injectable } from '@angular/core';

import { ICategory } from './category';
import { IListItem } from './list-item';

@Injectable()
export class TodoService {

  categories: ICategory[] = [
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

  listItems: IListItem[] = [
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

  getCategories(): ICategory[] {

    return this.categories;
  }

  getCategory(id: number): ICategory {
    
    return this.categories.find( category => category.id === id );
  }

  getListItems(categoryId: number): IListItem[] {

    return this.listItems.filter( (listItem: IListItem) => listItem.categoryId == categoryId );
  }

  addCategory(categoryName: string): void {

    let newId: number;

    if( this.categories.length > 0 ) {

      newId = this.categories[this.categories.length-1].id + 1;
    } else {

      newId = 1; 
    }

    let newCategory: ICategory = {
      "id": newId,
      "name": categoryName
    }

    this.categories.push(newCategory);
  }

  addItem(itemName: string, categoryId: number): IListItem {

    let newId: number;

    if( this.listItems.length > 0 ) {

      newId = this.listItems[this.listItems.length-1].id + 1;
    } else {

      newId = 1; 
    }

    let newListItem: IListItem = {
      "id"        : newId,
      "name"      : itemName,
      "categoryId": categoryId,
      "isComplete": false
    }

    this.listItems.push(newListItem);
    return newListItem;
  }

  updateListItem(listItem: IListItem): void {

    this.listItems = this.listItems.filter( (item: IListItem) => item.id != listItem.id );
    this.listItems.push(listItem);
  }

}
