import { StoreModule } from '@ngrx/store';

import { setUserDataReducer } from './user.reducer';

export const storeModules = [StoreModule.forFeature('userData', setUserDataReducer)];
