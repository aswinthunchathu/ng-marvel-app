import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { CharacterModel } from '../../character.model'

const TAG = '${TAG}'

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: CharacterModel }>())

export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())
