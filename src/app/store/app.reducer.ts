import { createSelector, ActionReducerMap } from '@ngrx/store'

import * as fromCharacters from '../characters/store'
import * as fromCharacter from '../characters/character-details/store'
import * as fromCharactersByComicId from '../characters/store/byComicId'
import * as fromCharactersBySeriesId from '../characters/store/bySeriesId'
import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'

import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'
import * as fromComicReducer from '../comics/comic-details/store/comic.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetailsReducer from '../series/series-details/store/series-details.reducer'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'

export interface AppState {
    characters: fromCharacters.State
    character: fromCharacter.State
    charactersByComicId: fromCharactersByComicId.State
    charactersBySeriesId: fromCharactersBySeriesId.State

    comics: fromComicsReducer.State
    series: fromSeriesReducer.State
    comicBySeriesId: fromComicsBySeriesIdReducer.State
    comicByCharacterId: fromComicsByCharacterIdReducer.State
    comic: fromComicReducer.State
    seriesDetails: fromSeriesDetailsReducer.State
    seriesByCharacterId: fromSeriesByCharacterIdReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharacters.default,
    character: fromCharacter.default,
    charactersByComicId: fromCharactersByComicId.default,
    charactersBySeriesId: fromCharactersBySeriesId.default,

    comics: fromComicsReducer.reducer,
    series: fromSeriesReducer.reducer,

    comicBySeriesId: fromComicsBySeriesIdReducer.reducer,
    comicByCharacterId: fromComicsByCharacterIdReducer.reducer,
    comic: fromComicReducer.reducer,
    seriesDetails: fromSeriesDetailsReducer.reducer,
    seriesByCharacterId: fromSeriesByCharacterIdReducer.reducer,
}

const characters = (state: AppState) => state.characters.data

export const selectAllCharacters = createSelector(
    characters,
    fromCharactersReducer.selectAll
)

export const selectCharactersTotal = createSelector(
    characters,
    fromCharactersReducer.selectTotal
)

const charactersByComicId = (state: AppState) => state.charactersByComicId.data

export const selectAllCharactersByComicId = createSelector(
    charactersByComicId,
    fromCharactersByComicIdReducer.selectAll
)

export const selectCharactersByComicIdTotal = createSelector(
    charactersByComicId,
    fromCharactersByComicIdReducer.selectTotal
)

export const selectFilterIdForCharactersByComicId = createSelector(
    charactersByComicId,
    state => {
        return state.filterId
    }
)

const charactersBySeriesId = (state: AppState) => state.charactersBySeriesId.data

export const selectAllCharactersBySeriesId = createSelector(
    charactersBySeriesId,
    fromCharactersBySeriesIdReducer.selectAll
)

export const selectCharactersBySeriesIdTotal = createSelector(
    charactersBySeriesId,
    fromCharactersBySeriesIdReducer.selectTotal
)

export const selectFilterIdForCharactersBySeriesId = createSelector(
    charactersBySeriesId,
    state => {
        return state.filterId
    }
)
