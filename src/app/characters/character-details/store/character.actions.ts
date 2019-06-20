import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { CharacterModel } from '../../character.model'

export const fetchStart = createAction('[CHARACTER] Fetch Start', props<{ payload: number }>())

export const fetchSuccess = createAction('[CHARACTER] Fetch Success', props<{ payload: CharacterModel }>())

export const fetchError = createAction('[CHARACTER] Fetch Error', props<{ payload: HttpErrorResponse }>())
