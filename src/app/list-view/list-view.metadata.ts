import * as fromRoot from '../store/app.selector'
import * as fromCharactersAction from '../store/characters/characters.actions'
import * as fromCharactersByComicIdAction from '../store/characters/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from '../store/characters/bySeriesId/characters-by-seriesId.actions'
import * as fromComicsAction from '../store/comics/comics.actions'
import * as fromComicsByCharacterIdAction from '../store/comics/byCharacterId/comics-by-characterId.actions'
import * as fromComicsBySeriesIdAction from '../store/comics/bySeriesId/comics-by-seriesId.actions'
import * as fromSeriesActions from '../store/series/series.actions'
import * as fromSeriesByCharacterIdActions from '../store/series/byCharacterId/series-by-characterId.actions'
import * as fromCharactersByNameActions from '../store/characters/byName/characters-by-name.actions'
import * as fromComicsByNameActions from '../store/comics/byName/comics-by-name.actions'
import * as fromSeriesByNameActions from '../store/series/byName/series-by-name.actions'
/*
    Types of filter app-lits-view component accepts
*/
export enum FILTER_TYPE {
    none = 'none',
    comic = 'comic',
    series = 'series',
    character = 'character',
    title = 'title',
}

/*
    app-lits-view component type
*/
export enum COMPONENT_TYPE {
    comics = 'comics',
    series = 'series',
    characters = 'characters',
}

/*
    app-lits-view settings for Characters input
*/
const charactersComponentMap = {
    [FILTER_TYPE.none]: {
        action: fromCharactersAction,
        state: 'characters',
        list: fromRoot.selectAllCharacters,
    },
    [FILTER_TYPE.comic]: {
        action: fromCharactersByComicIdAction,
        state: 'charactersByComicId',
        list: fromRoot.selectAllCharactersByComicId,
    },
    [FILTER_TYPE.series]: {
        action: fromCharactersBySeriesIdAction,
        state: 'charactersBySeriesId',
        list: fromRoot.selectAllCharactersBySeriesId,
    },
    [FILTER_TYPE.title]: {
        action: fromCharactersByNameActions,
        state: 'charactersByName',
        list: fromRoot.selectAllCharactersByName,
    },
}

/*
    app-lits-view settings for Comics input
*/
const comicsComponentMap = {
    [FILTER_TYPE.none]: {
        action: fromComicsAction,
        state: 'comics',
        list: fromRoot.selectAllComics,
    },
    [FILTER_TYPE.character]: {
        action: fromComicsByCharacterIdAction,
        state: 'comicByCharacterId',
        list: fromRoot.selectAllComicsByCharacterId,
    },
    [FILTER_TYPE.series]: {
        action: fromComicsBySeriesIdAction,
        state: 'comicBySeriesId',
        list: fromRoot.selectAllComicsBySeriesId,
    },
    [FILTER_TYPE.title]: {
        action: fromComicsByNameActions,
        state: 'comicsByName',
        list: fromRoot.selectAllComicsByName,
    },
}

/*
    app-lits-view settings for Series input
*/
const seriesComponentMap = {
    [FILTER_TYPE.none]: {
        action: fromSeriesActions,
        state: 'series',
        list: fromRoot.selectAllSeries,
    },
    [FILTER_TYPE.character]: {
        action: fromSeriesByCharacterIdActions,
        state: 'seriesByCharacterId',
        list: fromRoot.selectAllSeriesByCharacterId,
    },
    [FILTER_TYPE.title]: {
        action: fromSeriesByNameActions,
        state: 'seriesByName',
        list: fromRoot.selectAllSeriesByName,
    },
}

/*
    app-lits-view mapping the settings to component type
*/
export const componentSettings = {
    [COMPONENT_TYPE.characters]: charactersComponentMap,
    [COMPONENT_TYPE.comics]: comicsComponentMap,
    [COMPONENT_TYPE.series]: seriesComponentMap,
}

export const getSettings = (type: COMPONENT_TYPE, filter: FILTER_TYPE) => componentSettings[type][filter]
