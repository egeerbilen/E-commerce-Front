import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  @Output() categorySelected = new EventEmitter<number>();
  categories: { id: number; value: string }[] = [
    { id: 0, value: 'Category 0' },
    { id: 1, value: 'Category 1' },
    { id: 2, value: 'Category 2' },
    { id: 3, value: 'Category 3' },
    { id: 4, value: 'Category 4' }
  ];

  /**
   * FilterByCategory.
   * @param category Category.
   */
  public filterByCategory(category: any): void {
    this.categorySelected.emit(category);
  }
}
