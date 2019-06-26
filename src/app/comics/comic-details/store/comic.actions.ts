import { createAction, props } from '@ngrx/store'

import { ComicModel } from '../../comic.model'
import { ACTION_TAGS } from 'src/app/constants'

export const FETCH_COMIC_START = '[COMIC] Fetch Start'
export const FETCH_COMIC_SUCCESS = '[COMIC] Fetch Success'
export const FETCH_COMIC_ERROR = '[COMIC] Fetch Error'

const TAG = ACTION_TAGS.comic

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel }>())
