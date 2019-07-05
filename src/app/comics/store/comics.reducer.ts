import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import * as fromComicsActions from './comics.actions'
import { ComicModel } from '../comic.model'

export interface State extends EntityState<ComicModel> {}

const adapter: EntityAdapter<ComicModel> = createEntityAdapter<ComicModel>()

const initialState = adapter.getInitialState()

const generateReducer = createReducer<State>(
    initialState,
    on(fromComicsActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export const reducer = (state: State | undefined, action: Action) => generateReducer(state, action)

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
