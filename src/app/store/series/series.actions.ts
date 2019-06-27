import { createAction, props } from '@ngrx/store'
import { SeriesModel } from '../../model/series.model'
import { ACTION_TAGS } from '../../constants'

const TAG = ACTION_TAGS.series

export const fetchStart = createAction(`${TAG} Fetch Init`)

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: SeriesModel[] }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)