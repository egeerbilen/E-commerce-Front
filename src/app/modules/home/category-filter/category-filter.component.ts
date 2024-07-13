import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/dto/category-dto';

@Component({
  selector: 'app-home-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  @Output() categorySelected = new EventEmitter<number>();
  @Input() categories: CategoryDto[] = [];

  /**
   * FilterByCategory.
   * @param category Category.
   */
  public filterByCategory(category: number): void {
    this.categorySelected.emit(category);
  }
}
