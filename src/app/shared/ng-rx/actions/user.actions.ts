import { createAction, props } from '@ngrx/store';

import { DecodedTokenDto } from '../../dto/decoded-token-dto';

export const setUserData = createAction('[Counter Component] setUserData', props<{ userData: DecodedTokenDto | null }>());
