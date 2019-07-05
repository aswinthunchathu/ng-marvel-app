import { createAction, props } from '@ngrx/store'
import { ComicModel } from '../../comic.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.comicsBySeriesId

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: string }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel[] }>())

export const noMoreToFetch = createAction(`${TAG} No More`)

export const fetchedFromStore = createAction(`${TAG} Fetched From Store`)
