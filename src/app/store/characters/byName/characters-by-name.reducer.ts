import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'

import * as fromCharactersByNameActions from './characters-by-name.actions'
import { CharacterModel } from '../../../model/character.model'

export interface State extends EntityState<CharacterModel> {
    filter: string
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    filter: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromCharactersByNameActions.fetchStart, (state, action) => ({
        ...state,
        filter: action.payload,
    })),
    on(fromCharactersByNameActions.fetchSuccess, (state, action) => adapter.addAll(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
