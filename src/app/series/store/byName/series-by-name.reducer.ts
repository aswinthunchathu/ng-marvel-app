import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'

import * as fromSeriesByNameActions from './series-by-name.actions'
import { CharacterModel } from '../../../characters/character.model'

export interface State extends EntityState<CharacterModel> {
    filter: string
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    filter: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromSeriesByNameActions.fetchStart, (state, action) => {
        if (state.filter === action.payload) {
            return {
                ...state,
            }
        } else {
            return {
                ...state,
                ...initialState,
                filter: action.payload,
            }
        }
    }),
    on(fromSeriesByNameActions.fetchSuccess, (state, action) => adapter.addAll(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
