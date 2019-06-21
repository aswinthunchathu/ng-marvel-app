import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { ComicModel } from '../comic.model'

const TAG = '[COMICS]'

export const fetchStart = createAction(`${TAG} Fetch Init`)

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(
    `${TAG} Fetch Success`,
    props<{ payload: ComicModel[]; pagination: Pagination }>()
)

export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)
