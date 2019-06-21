import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'
import { ComicModel } from '../../comic.model'

export const FETCH_COMIC_START = '[COMIC] Fetch Start'
export const FETCH_COMIC_SUCCESS = '[COMIC] Fetch Success'
export const FETCH_COMIC_ERROR = '[COMIC] Fetch Error'

const TAG = '[COMIC]'

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel }>())

export const fetchError = createAction(`${TAG} Fetch Error`, props<{ payload: HttpErrorResponse }>())
