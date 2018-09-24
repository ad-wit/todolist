import { Component, OnInit } from '@angular/core';
import { ICategory } from './category';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  categories: ICategory[];
  selectedCategory: ICategory;

  constructor( private todoService: TodoService ) { }

  getCategories(): void {

    this.todoService.getCategories()
      .subscribe((categories: ICategory[]) => this.categories = categories);
  }

  addCategory(categoryName: string): void {

    categoryName = categoryName.trim();
    
    if( categoryName ) {
      
      this.todoService.addCategory(categoryName)
        .subscribe(
          (addedCategory: ICategory) => {
            this.selectedCategory = addedCategory
            this.categories.push(addedCategory);
          });
    }

  }

  deleteCategory(categoryId: number): void {

    this.todoService.deleteCategory(categoryId)
      .subscribe(
        (deletedCategory: ICategory) => {

          this.categories = this.categories.filter((category: ICategory) => category.id != deletedCategory.id);
      
          if( this.selectedCategory.id == deletedCategory.id ) {
      
            if( this.categories.length > 0 ) {
              this.selectedCategory = this.categories[0];
            } else {
              this.selectedCategory = undefined;
            }
          }
        });
  }

  ngOnInit() {
    
    this.getCategories();
    
    if( this.categories.length > 0 )
      this.selectedCategory = this.categories[0];
  }

}
