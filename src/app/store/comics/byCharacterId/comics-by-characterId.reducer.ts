import { createReducer, on, Action } from '@ngrx/store'

import * as fromComicsByCharacterIdActions from './comics-by-characterId.actions'
import { ComicModel } from '../../../model/comic.model'

import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'

export interface State extends EntityState<ComicModel> {
    filterId: number
}

export const adapter: EntityAdapter<ComicModel> = createEntityAdapter<ComicModel>()

const initialState = adapter.getInitialState({
    filterId: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromComicsByCharacterIdActions.fetchStart, (state, action) => {
        if (state.filterId === action.payload) {
            return {
                ...state,
            }
        } else {
            return {
                ...state,
                ...initialState,
                filterId: action.payload,
            }
        }
    }),
    on(fromComicsByCharacterIdActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
