import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoriyService } from 'src/app/shared/services/categoriy/categoriy.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _toastService ToastService.
   * @param _categoryService CategoryService.
   */
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _categoryService: CategoriyService
  ) {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.categoryForm.valid) {
      this._categoryService.addCategories(this.categoryForm.value).subscribe({
        next: () => this._toastService.show('Category added successfully'),
        error: () => this._toastService.show('Failed to add category')
      });
    } else {
      this._toastService.show('Form is invalid');
    }
  }
}
