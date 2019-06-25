import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import * as fromCharactersByComicIdActions from './characters-by-seriesId.actions'
import { PAGE_LIMIT } from '../../../constants'
import { Pagination } from '../../../shared/model/pagination.model'
import { CharacterModel } from '../../character.model'

export interface State extends EntityState<CharacterModel> {
    fetching: boolean
    pagination: Pagination
    error: HttpErrorResponse
    filterId: number
}

export const adapter: EntityAdapter<CharacterModel> = createEntityAdapter<CharacterModel>()

const initialState = adapter.getInitialState({
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    error: null,
    filterId: null,
})

const charactersBySeriesIdReducer = createReducer<State>(
    initialState,
    on(fromCharactersByComicIdActions.fetchStart, (state, action) => {
        if (state.filterId === action.payload) {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        } else {
            return {
                ...state,
                ...initialState,
                fetching: true,
                filterId: action.payload,
            }
        }
    }),
    on(fromCharactersByComicIdActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromCharactersByComicIdActions.fetchSuccess, (state, action) =>
        adapter.addMany(action.payload, {
            ...state,
            fetching: false,
            error: null,
            pagination: action.pagination,
        })
    ),
    on(fromCharactersByComicIdActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromCharactersByComicIdActions.fetchedFromStore, fromCharactersByComicIdActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return charactersBySeriesIdReducer(state, action)
}

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
