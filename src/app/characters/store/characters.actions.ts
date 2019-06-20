import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../shared/model/pagination.model'
import { CharacterModel } from '../character.model'

export const fetchStart = createAction('[CHARACTERS] Fetch Init')

export const fetchNextPage = createAction('[CHARACTERS] Fetch Next Page')

export const fetchSuccess = createAction(
    '[CHARACTERS] Fetch Success',
    props<{ payload: CharacterModel[]; pagination: Pagination }>()
)

export const fetchError = createAction('[CHARACTERS] Fetch Error', props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction('[CHARACTERS] No More')

export const noMoreToFetch = createAction('[CHARACTERS] Fetched From Store')
