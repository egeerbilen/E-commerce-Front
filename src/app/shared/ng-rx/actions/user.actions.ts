import { createAction, props } from '@ngrx/store';

import { DecodedTokenWithJwtDto } from '../../dto/decoded-token-with-jwt-dto';

export const setUserData = createAction('[Counter Component] setUserData', props<{ userData: DecodedTokenWithJwtDto | null }>());
