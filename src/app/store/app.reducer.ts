import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store'

import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'
import * as fromComicReducer from '../comics/comic-details/store/comic.reducer'
import * as fromCharacterReducer from '../characters/character-details/store/character.reducer'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetailsReducer from '../series/series-details/store/series-details.reducer'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'

export interface AppState {
    characters: fromCharactersReducer.State
    comics: fromComicsReducer.State
    series: fromSeriesReducer.State
    charactersByComicId: fromCharactersByComicIdReducer.State
    charactersBySeriesId: fromCharactersBySeriesIdReducer.State
    character: fromCharacterReducer.State
    comicBySeriesId: fromComicsBySeriesIdReducer.State
    comicByCharacterId: fromComicsByCharacterIdReducer.State
    comic: fromComicReducer.State
    seriesDetails: fromSeriesDetailsReducer.State
    seriesByCharacterId: fromSeriesByCharacterIdReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharactersReducer.reducer,
    comics: fromComicsReducer.reducer,
    series: fromSeriesReducer.reducer,
    charactersByComicId: fromCharactersByComicIdReducer.reducer,
    charactersBySeriesId: fromCharactersBySeriesIdReducer.reducer,
    character: fromCharacterReducer.reducer,
    comicBySeriesId: fromComicsBySeriesIdReducer.reducer,
    comicByCharacterId: fromComicsByCharacterIdReducer.reducer,
    comic: fromComicReducer.reducer,
    seriesDetails: fromSeriesDetailsReducer.reducer,
    seriesByCharacterId: fromSeriesByCharacterIdReducer.reducer,
}

export const selectCharactersState = createFeatureSelector<fromCharactersReducer.State>('characters')

export const selectAllCharacters = createSelector(
    selectCharactersState,
    fromCharactersReducer.selectAll
)

export const selectTotalCharacters = createSelector(
    selectCharactersState,
    fromCharactersReducer.selectTotal
)

export const selectCharactersByComicIdState = createFeatureSelector<fromCharactersByComicIdReducer.State>(
    'charactersByComicId'
)

export const selectAllCharactersByComicId = createSelector(
    selectCharactersByComicIdState,
    fromCharactersByComicIdReducer.selectAll
)

export const selectTotalCharactersByComicId = createSelector(
    selectCharactersByComicIdState,
    fromCharactersByComicIdReducer.selectTotal
)

export const selectCharactersBySeriesIdState = createFeatureSelector<fromCharactersBySeriesIdReducer.State>(
    'charactersBySeriesId'
)

export const selectAllCharactersBySeriesId = createSelector(
    selectCharactersByComicIdState,
    fromCharactersBySeriesIdReducer.selectAll
)

export const selectTotalCharactersBySeriesId = createSelector(
    selectCharactersByComicIdState,
    fromCharactersBySeriesIdReducer.selectTotal
)
