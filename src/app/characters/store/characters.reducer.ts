import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import * as fromCharacterActions from './characters.actions'
import { CharacterModel } from '../character.model'

export interface State extends EntityState<CharacterModel> {}

const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState()

const generateReducer = createReducer<State>(
    initialState,
    on(fromCharacterActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export const reducer = (state: State | undefined, action: Action) => generateReducer(state, action)

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
