import { createAction, props } from '@ngrx/store'
import { ComicModel } from '../../../model/comic.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.comicsBySeriesId

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel[] }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)