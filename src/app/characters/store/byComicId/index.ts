import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import * as fromUIReducer from '../../../shared/store/ui/ui.reducer'
import * as fromPaginationReducer from '../../../shared/store/pagination/pagination.reducer'
import * as fromReducer from './characters-by-comicId.reducer'

export interface State {
    ui: fromUIReducer.State
    pagination: fromPaginationReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.charactersByComicId),
    pagination: fromPaginationReducer.reducer(ACTION_TAGS.charactersByComicId),
    data: fromReducer.reducer,
})
