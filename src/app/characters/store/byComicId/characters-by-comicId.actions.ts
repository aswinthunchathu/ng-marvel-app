import { createAction, props } from '@ngrx/store'

import { CharacterModel } from '../../../model/character.model'
import { ACTION_TAGS } from 'src/app/constants'

const TAG = ACTION_TAGS.charactersByComicId

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: CharacterModel[] }>())

export const fetchedFromStore = createAction(`${TAG} No More`)

export const noMoreToFetch = createAction(`${TAG} Fetched From Store`)
