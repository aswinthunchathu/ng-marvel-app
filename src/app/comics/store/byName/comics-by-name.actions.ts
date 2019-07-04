import { createAction, props } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import { ComicModel } from '../../comic.model'

const TAG = ACTION_TAGS.comicsByName

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: string }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: ComicModel[] }>())

export const fetchedFromStore = createAction(`${TAG} Fetched From Store`)

export const noMoreToFetch = createAction(`${TAG} No More`)
