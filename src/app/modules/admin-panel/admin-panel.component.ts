import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserWithRolesDto } from 'src/app/shared/dto/user-with-roles-dto';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  resolvedUserData!: CustomResponseDto<UserWithRolesDto[]>;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   */
  constructor(private _route: ActivatedRoute) {
    this._route.data.subscribe((data) => {
      this.resolvedUserData = data['resolvedData'];
      console.log(this.resolvedUserData);
    });
  }
}
