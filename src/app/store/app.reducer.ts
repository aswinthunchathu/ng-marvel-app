import { ActionReducerMap } from '@ngrx/store'
import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromCharacterReducer from '../characters/character-details/store/character.reducer'

export interface AppState {
    characters: fromCharactersReducer.State
    character: fromCharacterReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharactersReducer.charactersReducer,
    character: fromCharacterReducer.characterReducer,
}
