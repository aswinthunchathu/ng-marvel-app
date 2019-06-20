import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'

export const fetchStart = createAction('[CHARACTERS BY COMIC ID] Fetch Start', props<{ payload: number }>())

export const fetchNextPage = createAction('[CHARACTERS BY COMIC ID] Fetch Next Page', props<{ payload: number }>())

export const fetchSuccess = createAction(
    '[CHARACTERS BY COMIC ID] Fetch Success',
    props<{ payload: CharacterModel[]; pagination: Pagination }>()
)

export const fetchError = createAction('[CHARACTERS BY COMIC ID] Fetch Error', props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction('[CHARACTERS BY COMIC ID] No More')

export const noMoreToFetch = createAction('[CHARACTERS BY COMIC ID] Fetched From Store')
