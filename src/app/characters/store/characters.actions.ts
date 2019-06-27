import { createAction, props } from '@ngrx/store'

import { CharacterModel } from '../../model/character.model'
import { ACTION_TAGS } from '../../constants'

const TAG = ACTION_TAGS.characters

export const fetchStart = createAction(`${TAG} Fetch Start`)

export const fetchNextPage = createAction(`${TAG} Fetch Next Page`)

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: CharacterModel[] }>())

export const fetchedFromStore = createAction(`${TAG} Fetched From Store`)

export const noMoreToFetch = createAction(`${TAG}  No More`)
