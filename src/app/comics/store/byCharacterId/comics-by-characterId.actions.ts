import { createAction, props } from '@ngrx/store'
import { ComicModel } from '../../comic.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.comicsByCharacterId

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel[] }>())

export const noMoreToFetch = createAction(`${TAG} No More`)

export const fetchedFromStore = createAction(`${TAG} Fetched From Store`)
