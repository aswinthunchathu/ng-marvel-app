import { HttpErrorResponse } from '@angular/common/http'
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromComicsBySeriesIdActions from './comics-by-seriesId.actions'
import { ComicModel } from '../../comic.model'

export interface State extends EntityState<ComicModel> {
    filterId: number
}

export const adapter: EntityAdapter<ComicModel> = createEntityAdapter<ComicModel>()

const initialState = adapter.getInitialState({
    filterId: null,
})

const generateReducer = createReducer<State>(
    initialState,
    on(fromComicsBySeriesIdActions.fetchStart, (state, action) => {
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
    on(fromComicsBySeriesIdActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export function reducer(state: State | undefined, action: Action) {
    return generateReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
