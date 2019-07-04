import { createReducer, on, Action } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import * as fromSeriesActions from './series.actions'
import { SeriesModel } from '../../series/series.model'

export interface State extends EntityState<SeriesModel> {}

const adapter: EntityAdapter<SeriesModel> = createEntityAdapter<SeriesModel>()

const initialState = adapter.getInitialState()

const generateReducer = createReducer<State>(
    initialState,
    on(fromSeriesActions.fetchSuccess, (state, action) => adapter.addMany(action.payload, state))
)

export const reducer = (state: State | undefined, action: Action) => generateReducer(state, action)

export const selectAll = adapter.getSelectors().selectAll
export const selectTotal = adapter.getSelectors().selectTotal
