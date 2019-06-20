import { HttpErrorResponse } from '@angular/common/http'
import { createReducer, on, Action } from '@ngrx/store'

import * as fromComicsActions from './comics.actions'
import { PAGE_LIMIT } from '../../shared/constants'
import { Pagination } from '../../shared/model/pagination.model'
import { ComicModel } from '../comic.model'

export interface State {
    fetching: boolean
    data: ComicModel[]
    pagination: Pagination
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    pagination: new Pagination(-1, PAGE_LIMIT, 0, 0),
    data: [],
    error: null,
}

const comicsReducer = createReducer(
    initialState,
    on(fromComicsActions.fetchStart, fromComicsActions.fetchNextPage, state => ({
        ...state,
        fetching: true,
        error: null,
    })),
    on(fromComicsActions.fetchSuccess, (state, action) => ({
        ...state,
        fetching: false,
        error: null,
        pagination: action.pagination,
        data: [...state.data, ...action.payload],
    })),
    on(fromComicsActions.fetchError, (state, action) => ({
        ...state,
        fetching: false,
        error: action.payload,
    })),
    on(fromComicsActions.fetchedFromStore, fromComicsActions.noMoreToFetch, state => ({
        ...state,
        fetching: false,
    }))
)

export function reducer(state: State | undefined, action: Action) {
    return comicsReducer(state, action)
}
