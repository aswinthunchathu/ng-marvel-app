import { createAction, props } from '@ngrx/store'

import { SeriesModel } from '../../series.model'
import { ACTION_TAGS } from 'src/app/constants'

const TAG = ACTION_TAGS.seriesDetails

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: SeriesModel }>())
