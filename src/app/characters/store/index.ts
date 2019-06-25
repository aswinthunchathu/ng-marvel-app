import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../constants'
import * as fromUIReducer from '../../store/ui/ui.reducer'
import * as fromPaginationReducer from '../../store/ui/pagination.reducer'
import * as fromReducer from './characters.reducer'

export interface State {
    ui: fromUIReducer.State
    pagination: fromPaginationReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.characters),
    pagination: fromPaginationReducer.reducer(ACTION_TAGS.characters),
    data: fromReducer.reducer,
})
