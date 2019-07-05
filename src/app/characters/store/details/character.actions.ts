import { createAction, props } from '@ngrx/store'
import { CharacterModel } from '../../character.model'
import { ACTION_TAGS } from '../../../constants'

const TAG = ACTION_TAGS.character

export const fetchStart = createAction(`${TAG} Fetch Start`, props<{ payload: string }>())

export const fetchSuccess = createAction(`${TAG} Fetch Success`, props<{ payload: CharacterModel }>())
