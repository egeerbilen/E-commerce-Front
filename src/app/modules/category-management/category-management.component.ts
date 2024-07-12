/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CategoryService } from 'src/app/shared/services/categoriy/categoriy.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: CategoryDto[] = [];
  categoryForm: FormGroup;
  isEditMode = false;
  selectedCategory: CategoryDto | null = null;

  /**
   * Constructor.
   * @param _categoryService CategoriyService.
   * @param _fb FormBuilder.
   * @param _snackBar MatSnackBar.
   * @param dialog MatDialog.
   */
  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this.loadCategories();
  }

  /**
   * LoadCategories.
   */
  public loadCategories(): void {
    this._categoryService.getCategories().subscribe((categories) => {
      // this.categories = categories;
    });
  }

  /**
   * AddCategory.
   */
  public addCategory(): void {
    if (this.categoryForm.valid) {
      const category: CategoryDto = this.categoryForm.value;
      this._categoryService.addCategory(category).subscribe({
        next: () => {
          this._snackBar.open('Category added successfully', 'Close', { duration: 2000 });
          this.loadCategories();
          this.categoryForm.reset();
        },
        error: () => this._snackBar.open('Failed to add category', 'Close', { duration: 2000 })
      });
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
      this._categoryService.updateCategory(category).subscribe({
        next: () => {
          this._snackBar.open('Category updated successfully', 'Close', { duration: 2000 });
          this.loadCategories();
          this.cancelEdit();
        },
        error: () => this._snackBar.open('Failed to update category', 'Close', { duration: 2000 })
      });
    }
  }

  /**
   * DeleteCategory.
   * @param id Id.
   */
  public deleteCategory(id: number): void {
    this._categoryService.deleteCategory(id).subscribe({
      next: () => {
        this._snackBar.open('Category deleted successfully', 'Close', { duration: 2000 });
        this.loadCategories();
      },
      error: () => this._snackBar.open('Failed to delete category', 'Close', { duration: 2000 })
    });
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
