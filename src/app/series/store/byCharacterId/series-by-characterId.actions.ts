import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from 'src/app/shared/model/pagination.model'
import { SeriesModel } from '../../series.model'

export const FETCH_SERIES_BY_CHARACTER_ID_START = '[SERIES BY CHARACTER ID] Fetch Start'

const TAG = '[SERIES BY CHARACTER ID]'

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`, props<{ payload: number }>())

export const fetchSuccess = createAction(
    `${TAG} Fetch Success`,
    props<{ payload: SeriesModel[]; pagination: Pagination }>()
)

export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)
