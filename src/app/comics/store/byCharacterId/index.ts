import { combineReducers } from '@ngrx/store'

import { ACTION_TAGS } from '../../../constants'
import * as fromUIReducer from '../../../store/ui/ui.reducer'
import * as fromPaginationReducer from '../../../store/pagination/pagination.reducer'
import * as fromReducer from './comics-by-characterId.reducer'

export interface State {
    ui: fromUIReducer.State
    pagination: fromPaginationReducer.State
    data: fromReducer.State
}

export default combineReducers<State>({
    ui: fromUIReducer.reducer(ACTION_TAGS.comicsByCharacterId),
    pagination: fromPaginationReducer.reducer(ACTION_TAGS.comicsByCharacterId),
    data: fromReducer.reducer,
})
