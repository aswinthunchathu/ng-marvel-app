import { createAction, props } from '@ngrx/store'

import { CharacterModel } from '../../../model/character.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.charactersByName

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: string }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: CharacterModel[] }>())

export const fetchedFromStore = createAction(`${TAG} Fetched From Store`)
