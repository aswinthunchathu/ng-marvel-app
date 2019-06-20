import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../comic.model'

export const fetchStart = createAction('[COMICS] Fetch Init')

export const fetchNextPage = createAction('[COMICS] Fetch Next Page')

export const fetchSuccess = createAction(
    '[COMICS] Fetch Success',
    props<{ payload: ComicModel[]; pagination: Pagination }>()
)

export const fetchError = createAction('[COMICS] Fetch Error', props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction('[COMICS] No More')

export const noMoreToFetch = createAction('[COMICS] Fetched From Store')
