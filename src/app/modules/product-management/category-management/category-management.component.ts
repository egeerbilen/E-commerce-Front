import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent {
  categories: CategoryDto[] = [];
  resolvedCategoriesData!: CustomResponseDto<CategoryDto[]>;
  categoryForm: FormGroup;
  isEditMode = false;
  selectedCategory: CategoryDto | null = null;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _categoryService CategoryService.
   * @param _fb FormBuilder.
   * @param _toastService ToastService.
   * @param dialog MatDialog.
   */
  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    public dialog: MatDialog
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedCategoriesData = data['resolvedData']; // Access resolved data here
      if (this.resolvedCategoriesData && this.resolvedCategoriesData.data) {
        this.categories = this.resolvedCategoriesData.data;
      } else {
        this.categories = [];
      }
    });

    this.categoryForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  /**
   * AddCategory.
   */
  public addCategory(): void {
    if (this.categoryForm.valid) {
      const category: CategoryDto = this.categoryForm.value;
      this._categoryService.addCategory(category).subscribe(
        () => {
          // Add the new category to the local list
          this.categories.push(category);
          this._toastService.show('Category added successfully', 'Close', 2000);
          this.categoryForm.reset();
        },
        () => this._toastService.show('Failed to add category', 'Close', 2000)
      );
    }
  }

  /**
   * EditCategory.
   * @param category Category.
   */
  public editCategory(category: CategoryDto): void {
    this.isEditMode = true;
    this.selectedCategory = category;
    this.categoryForm.patchValue(category);
  }

  /**
   * UpdateCategory.
   */
  public updateCategory(): void {
    if (this.categoryForm.valid && this.selectedCategory) {
      const category: CategoryDto = { ...this.selectedCategory, ...this.categoryForm.value };
      this._categoryService.updateCategory(category).subscribe(
        () => {
          // Update the category in the local list
          const index = this.categories.findIndex((cat) => cat.id === this.selectedCategory!.id);
          if (index !== -1) {
            this.categories[index] = category;
          }
          this._toastService.show('Category updated successfully', 'Close', 2000);
          this.cancelEdit();
        },
        () => this._toastService.show('Failed to update category', 'Close', 2000)
      );
    }
  }

  /**
   * DeleteCategory.
   * @param id Id.
   */
  public deleteCategory(id: number): void {
    this._categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter((category) => category.id !== id);
        this._toastService.show('Category deleted successfully', 'Close', 2000);
        console.log(this.categories);
      },
      (error) => {
        console.error('Failed to delete category', error);
        this._toastService.show('Failed to delete category', 'Close', 2000);
      }
    );
  }

  /**
   * CancelEdit.
   */
  public cancelEdit(): void {
    this.isEditMode = false;
    this.selectedCategory = null;
    this.categoryForm.reset();
  }
}
