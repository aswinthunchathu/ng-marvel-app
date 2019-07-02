import { createAction, props } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import { ComicModel } from '../../../model/comic.model'

const TAG = ACTION_TAGS.seriesByName

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: string }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel[] }>())
