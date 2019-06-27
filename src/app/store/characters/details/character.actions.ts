import { createAction, props } from '@ngrx/store'
import { CharacterModel } from '../../../model/character.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.character

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: number }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: CharacterModel }>())
