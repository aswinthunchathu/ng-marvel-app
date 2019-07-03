import * as fromRoot from '../store/app.selector'
import * as fromCharactersAction from './store/characters.actions'
import * as fromCharactersByComicIdAction from './store/byComicId/characters-by-comicId.actions'
import * as fromCharactersBySeriesIdAction from './store/bySeriesId/characters-by-seriesId.actions'
import * as fromCharactersByNameActions from './store/byName/characters-by-name.actions'

export enum FILTER_TYPE {
    'none' = 'none',
    'byComicId' = 'byComicId',
    'bySeriesId' = 'bySeriesId',
    'byTitle' = 'byTitle',
}

/*
    characters component mapping based on filter or no filter
*/

export const mapping = (type?: FILTER_TYPE) => {
    switch (type) {
        case FILTER_TYPE.byComicId:
            return {
                action: fromCharactersByComicIdAction,
                state: 'charactersByComicId',
                list: fromRoot.selectAllCharactersByComicId,
            }
        default:
            return {
                action: fromCharactersAction,
                state: 'characters',
                list: fromRoot.selectAllCharacters,
            }
    }
}

// const mapping2 = {
//     [FILTER_TYPE.none]: {
//         action: fromCharactersAction,
//         state: 'characters',
//         list: fromRoot.selectAllCharacters,
//     },
//     [FILTER_TYPE.byComicId]: {
//         action: fromCharactersByComicIdAction,
//         state: 'charactersByComicId',
//         list: fromRoot.selectAllCharactersByComicId,
//     },
//     [FILTER_TYPE.bySeriesId]: {
//         action: fromCharactersBySeriesIdAction,
//         state: 'charactersBySeriesId',
//         list: fromRoot.selectAllCharactersBySeriesId,
//     },
//     [FILTER_TYPE.byTitle]: {
//         action: fromCharactersByNameActions,
//         state: 'charactersByName',
//         list: fromRoot.selectAllCharactersByName,
//     },
// }
