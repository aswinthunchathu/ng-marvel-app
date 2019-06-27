import { createSelector, ActionReducerMap } from '@ngrx/store'

import * as fromCharacters from '../characters/store'
import * as fromCharacter from '../characters/character-details/store'
import * as fromCharactersByComicId from '../characters/store/byComicId'
import * as fromCharactersBySeriesId from '../characters/store/bySeriesId'
import * as fromCharactersReducer from '../characters/store/characters.reducer'
import * as fromCharactersByComicIdReducer from '../characters/store/byComicId/characters-by-comicId.reducer'
import * as fromCharactersBySeriesIdReducer from '../characters/store/bySeriesId/characters-by-seriesId.reducer'

import * as fromComics from '../comics/store'
import * as fromComicsReducer from '../comics/store/comics.reducer'
import * as fromComic from '../comics/comic-details/store'
import * as fromComicsByCharacterId from '../comics/store/byCharacterId'
import * as fromComicsByCharacterIdReducer from '../comics/store/byCharacterId/comics-by-characterId.reducer'
import * as fromComicsBySeriesId from '../comics/store/bySeriesId'
import * as fromComicsBySeriesIdReducer from '../comics/store/bySeriesId/comics-by-seriesId.reducer'

import * as fromSeries from '../series/store'
import * as fromSeriesByCharacterId from '../series/store/byCharacterId'
import * as fromSeriesReducer from '../series/store/series.reducer'
import * as fromSeriesDetails from '../series/series-details/store'
import * as fromSeriesByCharacterIdReducer from '../series/store/byCharacterId/series-by-characterId.reducer'

export interface AppState {
    characters: fromCharacters.State
    character: fromCharacter.State
    charactersByComicId: fromCharactersByComicId.State
    charactersBySeriesId: fromCharactersBySeriesId.State
    comics: fromComics.State
    comic: fromComic.State
    comicByCharacterId: fromComicsByCharacterId.State
    comicBySeriesId: fromComicsBySeriesId.State
    series: fromSeries.State
    seriesDetails: fromSeriesDetails.State
    seriesByCharacterId: fromSeriesByCharacterId.State
}

export const appReducer: ActionReducerMap<AppState> = {
    characters: fromCharacters.default,
    character: fromCharacter.default,
    charactersByComicId: fromCharactersByComicId.default,
    charactersBySeriesId: fromCharactersBySeriesId.default,
    comics: fromComics.default,
    comic: fromComic.default,
    comicByCharacterId: fromComicsByCharacterId.default,
    comicBySeriesId: fromComicsBySeriesId.default,
    series: fromSeries.default,
    seriesDetails: fromSeriesDetails.default,
    seriesByCharacterId: fromSeriesByCharacterId.default,
}
