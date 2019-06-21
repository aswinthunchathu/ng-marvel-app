import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../shared/model/pagination.model'
import { CharacterModel } from '../character.model'

const TAG = '[CHARACTERS]'

export const fetchStart = createAction(`${TAG} Fetch Start`)

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(
    `${TAG} Fetch Success`,
    props<{ payload: CharacterModel[]; pagination: Pagination }>()
)

export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)
