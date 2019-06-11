import { ActionReducerMap } from '@ngrx/store'
import * as fromCharactersReducer from '../characters/store/characters.reducer'

export interface AppState {
    characters: fromCharactersReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharactersReducer.CharactersReducer,
}
