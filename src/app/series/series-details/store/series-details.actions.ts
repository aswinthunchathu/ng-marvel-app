import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { SeriesModel } from '../../series.model'

const TAG = '[SERIES DETAILS]'

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: SeriesModel }>())

export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())
