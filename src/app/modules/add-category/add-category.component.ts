import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

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
    private _categoryService: CategoryService
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
      this._categoryService.addCategory(this.categoryForm.value).subscribe();
    } else {
      this._toastService.show('Form is invalid');
    }
  }
}
