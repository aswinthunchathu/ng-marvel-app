import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../constants'
import * as fromUIReducer from '../shared/store/ui/ui.reducer'
import * as fromPaginationReducer from '../shared/store/pagination/pagination.reducer'
import * as fromReducer from './series.reducer'

export interface State {
    ui: fromUIReducer.State
    pagination: fromPaginationReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.series),
    pagination: fromPaginationReducer.reducer(ACTION_TAGS.series),
    data: fromReducer.reducer,
})
