import { createAction, props } from '@ngrx/store'
import { ComicModel } from '../../comic.model'
import { ACTION_TAGS } from 'src/app/constants'

const TAG = ACTION_TAGS.comicsByCharacterId

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel[] }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)
