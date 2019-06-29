import { createReducer, on, Action } from '@ngrx/store'

import * as fromPaginationActions from './pagination.action'
import { Pagination } from '../../model/pagination.model'
import { PAGE_LIMIT } from '../../constants'

export interface State {
    data: Pagination
}

const initialState: State = {
    data: new Pagination(-1, PAGE_LIMIT, 0, 0),
}

const paginationReducer = (tag: string) =>
    createReducer<State>(
        initialState,
        on(fromPaginationActions.resetPagination(tag), state => ({
            ...state,
            ...initialState,
        })),
        on(fromPaginationActions.setPagination(tag), (state, action) => ({
            ...state,
            data: action.payload,
        }))
    )

export const reducer = (tag: string) => (state: State | undefined, action: Action) =>
    paginationReducer(tag)(state, action)
