import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromSeriesByCharacterIdActions from './series-by-characterId.actions'
import { SeriesModel } from '../../../model/series.model'

export interface State extends EntityState<SeriesModel> {
    filterId: number
}

export const adapter: EntityAdapter<SeriesModel> = createEntityAdapter<SeriesModel>()

const initialState = adapter.getInitialState({
    filterId: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromSeriesByCharacterIdActions.fetchStart, (state, action) => {
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
    on(fromSeriesByCharacterIdActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
