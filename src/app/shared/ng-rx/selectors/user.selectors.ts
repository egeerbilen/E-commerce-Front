import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../store/user.store';

export const getUserData = createSelector(createFeatureSelector<UserState>('userData'), (state: UserState) => state.userData);
