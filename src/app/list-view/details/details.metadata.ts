import { FILTER_TYPE } from '../list-view.metadata'
import * as fromCharacterActions from '../../store/characters/details/character.actions'
import * as fromComicActions from '../../store/comics/details/comic.actions'
import * as fromSeriesDetailsActions from '../../store/series/details/series-details.actions'

export enum COMPONENT_TYPE {
    'characterDetails' = 'characterDetails',
    'comicDetails' = 'comicDetails',
    'seriesDetails' = 'seriesDetails',
}

export const componentSettings = {
    [COMPONENT_TYPE.characterDetails]: {
        filterKey: FILTER_TYPE.character,
        action: fromCharacterActions,
        state: 'character',
    },
    [COMPONENT_TYPE.comicDetails]: {
        filterKey: FILTER_TYPE.comic,
        action: fromComicActions,
        state: 'comic',
    },
    [COMPONENT_TYPE.seriesDetails]: {
        filterKey: FILTER_TYPE.series,
        action: fromSeriesDetailsActions,
        state: 'seriesDetails',
    },
}

export const getSettings = (type: COMPONENT_TYPE) => componentSettings[type]
