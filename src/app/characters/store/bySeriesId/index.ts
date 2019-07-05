import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import * as fromUIReducer from '../../../store/ui/ui.reducer'
import * as fromPaginationReducer from '../../../store/pagination/pagination.reducer'
import * as fromReducer from './characters-by-seriesId.reducer'

export interface State {
    ui: fromUIReducer.State
    pagination: fromPaginationReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.charactersBySeriesId),
    pagination: fromPaginationReducer.reducer(ACTION_TAGS.charactersBySeriesId),
    data: fromReducer.reducer,
})
