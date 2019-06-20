import { Action, createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { Pagination } from '../../shared/model/pagination.model'
import { SeriesModel } from '../series.model'

export const fetchStart = createAction('[SERIES] Fetch Init')

export const fetchNextPage = createAction('[SERIES] Fetch Next Page')

export const fetchSuccess = createAction(
    '[SERIES] Fetch Success',
    props<{ payload: SeriesModel[]; pagination: Pagination }>()
)

export const fetchError = createAction('[SERIES] Fetch Error', props<{ payload: HttpErrorResponse }>())

export const fetchedFromStore = createAction('[SERIES] No More')

export const noMoreToFetch = createAction('[SERIES] Fetched From Store')
